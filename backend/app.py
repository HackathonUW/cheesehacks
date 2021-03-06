from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData, Table, Enum
from geoalchemy2 import Geometry
from geopy.geocoders import Nominatim
import enum
from sqlalchemy import func
from sqlalchemy.types import UserDefinedType
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

connstr =  "mysql://a0njs6zhe0h01rdm:yaxdi3felgio85ta@en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/glmirxsdwg8f23ls"
app.config['SQLALCHEMY_DATABASE_URI'] = connstr
db = SQLAlchemy(app)
engine = create_engine(connstr)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]= True

meta = MetaData()
meta.bind= engine

# A welcome message to test our server
class wi_covid(db.Model):  
    __table__ = Table('wi_covid', meta, autoload = True, autoload_with=db.engine)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class UserType(enum.Enum):
    organization=0
    user = 1
class Point(UserDefinedType):
    def get_col_spec(self):
        return "POINT"

    def bind_expression(self, bindvalue):
        return func.ST_GeomFromText(bindvalue, type_=self)

    def column_expression(self, col):
        return func.ST_AsText(col, type_=self)
class Users(db.Model):
    email = db.Column(db.String(255), nullable= False, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address  = db.Column(db.String(255), nullable=False)
    zip_code = db.Column(db.String(20), nullable = False)
    type = db.Column(db.Enum(UserType), nullable=False)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Events(db.Model):
    pid = db.Column(db.Integer, nullable= False, primary_key=True)
    email = db.Column(db.String(255), nullable= False)
    description = db.Column(db.Text(), nullable = True)
    dates = db.Column(db.String(255), nullable = False)
    address  = db.Column(db.String(255), nullable=False)
    zip_code = db.Column(db.String(20), nullable = False)
    coordinates = db.Column(Point, nullable=False)
    num_attend = db.Column(db.Integer, nullable= False)
    evname = db.Column(db.String(255),nullable=False)
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
class Attended(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pid = db.Column(db.Integer, db.ForeignKey('events.pid'))
    email = db.Column(db.String(255), db.ForeignKey('users.email'))
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

@app.route('/attended', methods=['POST'])
def attended():
    return jsonify([i.as_dict() for i in Attended.query.all()])

@app.route('/users', methods=['POST'])
def users():
    if(request.json.get('action', None) == 'add'):
        try:
            db.session.add(Users(email = request.json["email"],name=request.json["name"],address=request.json["address"],
            zip_code = request.json["zip_code"],type=UserType[request.json["type"]]))
            db.session.commit()
        except Exception as e:
            print(e)
            return jsonify({"error": True})
        return jsonify({"error" : False})
    if(request.json.get('action') == 'search'):
        lists = []
        for i in Users.query.all():
            i=i.as_dict()
            i["type"] = i["type"].name
            lists.append(i)
        return jsonify(lists)
    if(request.json.get('action') == 'attended'):
        if(not Attended.query.filter(Attended.pid==request.json['pid'], Attended.email==request.json['email']).count()):
            db.session.add(Attended(pid=request.json['pid'], email=request.json['email']))
            db.session.commit()
            return jsonify({"error" : False})
        else:
            return jsonify({"error":True})
    if(request.json.get('action') == 'list'):
        return jsonify([i[0].as_dict()|i[1].as_dict() for i in db.session.query(Attended,Events).filter(Attended.email==request.json['email'],Attended.pid==Events.pid).all()])

    return jsonify({"error" : True})
@app.route('/events', methods=['POST'])
def events():
    if(request.json.get('action', None) == 'add'):
        try:
            geolocator = Nominatim(user_agent="Aeris")
            location = geolocator.geocode(request.json["address"] + " " + str(request.json["zip_code"]))
            dates = request.json["dates"]["dateTime"] + "," + request.json["dates"]["fdateTime"]
            db.session.add(Events(pid = request.json["id"],email=request.json["email"],address=request.json["address"],
            zip_code = request.json["zip_code"], description=request.json["description"], dates=dates
            , coordinates = 'POINT('+str(location.latitude) + " " + str(location.longitude) + ')', num_attend=0, 
            evname=request.json["eventname"]))
            db.session.commit()
        except Exception as e:
            print(e)
            return jsonify({"error": True})
        return jsonify({"error" : False})
    if(request.json.get('action') == 'search'):
        lists = []
        for i in db.session.query(Events, Users).filter(Events.email == Users.email).all():
            temp = i[1].as_dict()
            temp["type"] = temp["type"].name
            lists.append(i[0].as_dict()|temp)
        return jsonify(lists)
    if(request.json.get('action') == 'increment'):
        obj = Events.query(pid=request.json["id"]).one()
        obj.num_attend +=1
        db.session.commit()
        return jsonify({"error" : False})
    if(request.json.get('action') == "length"):
        return jsonify({ "error" : False,"length": Events.query.count()})
    if(request.json.get('action') == "delete"):
        db.session.query(Events).filter(Events.pid==request.json["pid"]).delete()
        db.session.commit()
        return jsonify({"error": False})
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
    with engine.connect() as con:
        with open("data/covid.csv") as f:
            count = 0
            headers = next(f)
            for i in f:
                i = i.split(",")
                i[1] = i[1].replace(" ","_")
                i[1] = ''.join(e for e in i[1] if e.isalnum() or e=='_')
                print(i)
                if(i[1].lower() not in [a[0].lower() for a in con.execute("DESCRIBE wi_covid")]):
                    con.execute("ALTER TABLE wi_covid ADD " + i[1]  + " FLOAT;")                
                    if(con.execute("SELECT * FROM wi_covid WHERE county = " + "'"+ i[0] + "'").rowcount):
                        pass
                    else:
                        con.execute("INSERT INTO wi_covid (county) VALUES(" + "'" + i[0] + "')" )
                    con.execute("UPDATE wi_covid SET " + i[1] + "=" + i[-1].rstrip() + " WHERE county=" + "'" + i[0] + "'" )                    
                else:
                    if(con.execute("SELECT * FROM wi_covid WHERE county = " + "'"+ i[0] + "'").rowcount):
                        pass
                    else:
                        con.execute("INSERT INTO wi_covid (county) VALUES(" + "'" + i[0] + "')" )
                    con.execute("UPDATE wi_covid SET " + i[1] + "=" + i[-1].rstrip() + " WHERE county=" + "'" + i[0] + "'" )                    
             '''
                

                
            