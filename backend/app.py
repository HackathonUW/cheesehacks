from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData, Table

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

class Events(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address  = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text(), nullable = True)




@app.route('/events')
def events():
    pass

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
                

                
            