from flask_mysqldb import MySQL

mysql = MySQL()

def init_db(app):
    app.config["MYSQL_HOST"] = "localhost"
    app.config["MYSQL_USER"] = "root"
    app.config["MYSQL_PASSWORD"] = "123456789"
    app.config["MYSQL_DB"] = "my_database"
    mysql.init_app(app)

