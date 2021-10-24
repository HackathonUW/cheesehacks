from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData, Table, Enum
from geoalchemy2 import Geometry
from geopy.geocoders import Nominatim
import enum


app = Flask(__name__)
connstr =  "mysql://a0njs6zhe0h01rdm:yaxdi3felgio85ta@en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/glmirxsdwg8f23ls"
app.config['SQLALCHEMY_DATABASE_URI'] = connstr
db = SQLAlchemy(app)
meta = MetaData()
engine = create_engine(connstr)

# A welcome message to test our server
class wi_covid(db.Model):  
    __table__ = Table('wi_covid', meta, autoload = True, autoload_with=db.engine)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
class UserType(enum.Enum):
    organization=0
    user = 1

class Users(db.Model):
    email = db.Column(db.String(255), nullable= False, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address  = db.Column(db.String(255), nullable=False)
    zip_code = db.Column(db.Integer, nullable = False)
    type = db.Column(db.Enum(UserType), nullable=False)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
class Events(db.Model):
    pid = db.Column(db.Integer, nullable= False, primary_key=True)
    email = db.Column(db.String(255), nullable= False)
    description = db.Column(db.Text(), nullable = True)
    dates = db.Column(db.DATETIME(), nullable = False)
    address  = db.Column(db.String(255), nullable=False)
    zip_code = db.Column(db.Integer, nullable = False)
    coordinates = db.Column(Geometry('POINT'), nullable = False)
    num_attend = db.Column(db.Integer, nullable= False)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

@app.route('/users', methods=['POST'])
def users():
    if(request.json.get('action', None) == 'add'):
        try:
            db.session.add(Users(name=request.json["name"],address=request.json["address"],
            zip_code = request.json["zip_code"], description=request.json["description"], dates=request.json["dates"], type=request.json["type"]))
        except Exception as e:
            print(e)
            return jsonify({"error": True})
        return jsonify({"error" : False})
    if(request.json.get('action') == 'search'):
        return jsonify(i.as_dict for i in Events.query.all())

    return jsonify({"error" : True})
@app.route('/events', methods=['POST'])
def events():
    if(request.json.get('action', None) == 'add'):
        try:
            geolocator = Nominatim(user_agent="Aeris")
            location = geolocator.geocode(request.json["address"] + " " + str(request.json["zip_code"]))
            db.session.add(Events(pid = request.json["id"],email=request.json["email"],address=request.json["address"],
            zip_code = request.json["zip_code"], description=request.json["description"], dates=request.json["dates"]
            , coordinates = (location.latitude,location.longitude), num_attend=0))
        except Exception as e:
            print(e)
            return jsonify({"error": True})
        return jsonify({"error" : False})
    if(request.json.get('action') == 'search'):
        return jsonify(i.as_dict for i in Events.query.all())
    if(request.json.get('action') == 'increment'):
        obj = Events.query(pid=request.json["id"]).one()
        obj.num_attend +=1
        db.session.commit()
        return jsonify({"error" : False})
    if(request.json.get('action') == "length"):
        return jsonify({ "error" : False,"length": Events.query.all().rowcount})
    return jsonify({"error": True})

@app.route('/')
def index():
    return "<h1>Welcome to our server !!</h1>"
@app.route('/wicovid', methods=['POST'])
def wicovid():
    return jsonify( [i.as_dict() for i in wi_covid.query.all()])

if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    # CODE to fill DB
    app.run()
    '''
        with open("data/covid.csv") as f:
            headers = next(f)
            for i in f:
                i = i.split(",")
                i[1] = i[1].replace(" ","_")
                i[1] = ''.join(e for e in i[1] if e.isalnum() or e=='_')
                print(i)

                if(i[1].lower() not in [a[0].lower() for a in con.execute("DESCRIBE wi_covid")]):
                    con.execute("ALTER TABLE wi_covid ADD " + i[1]  + " FLOAT;")
                    con.execute("UPDATE wi_covid SET " + i[1] + "=" + i[-1].rstrip())                    
                else:
                    con.execute("UPDATE wi_covid SET " + i[1] + "=" + i[-1].rstrip())
            '''     
                

                
            