from database_connect import mysql
import MySQLdb

class LocationService:
    @staticmethod
    def get_provinces():
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = "SELECT id, name FROM provinces"
        cursor.execute(query)
        provinces = cursor.fetchall()
        cursor.close()
        return provinces

    @staticmethod
    def get_districts(province_id):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = "SELECT id, name FROM districts WHERE province_id = %s"
        cursor.execute(query, (province_id,))
        districts = cursor.fetchall()
        cursor.close()
        return districts

    @staticmethod
    def get_wards(district_id):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        query = "SELECT id, name FROM wards WHERE district_id = %s"
        cursor.execute(query, (district_id,))
        wards = cursor.fetchall()
        cursor.close()
        return wards
