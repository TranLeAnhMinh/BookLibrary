from flask import Flask
from database_connect import init_db, mysql
from views.image_views import image_bp
import sys
sys.stdout.reconfigure(encoding='utf-8')
from flask_cors import CORS

from views.auth_views import auth_blueprint
from views.books_views import book_blueprint
from views.cart_views import cart_blueprint
from views.wishlist_views import wishlist_blueprint
from views.order_views import order_blueprint
from views.location_views import location_blueprint
from views.employees_views import employee_blueprint
from views.users_views import user_blueprint
from views.category_views import category_blueprint
from views.author_views import author_blueprint 
from views.publisher_views import publisher_blueprint
from views.image_upload_views import image_upload_bp
from views.review_views import review_blueprint
from views.statistics_views import statistics_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
app.register_blueprint(image_bp)
app.register_blueprint(book_blueprint, url_prefix='/api')
app.register_blueprint(cart_blueprint, url_prefix="/api")
app.register_blueprint(wishlist_blueprint, url_prefix="/api")
app.register_blueprint(order_blueprint, url_prefix="/api")
app.register_blueprint(location_blueprint, url_prefix='/api/locations')
app.register_blueprint(employee_blueprint, url_prefix="/api")
app.register_blueprint(user_blueprint, url_prefix="/api")
app.register_blueprint(category_blueprint, url_prefix="/api")
app.register_blueprint(author_blueprint, url_prefix="/api")
app.register_blueprint(publisher_blueprint, url_prefix="/api")
app.register_blueprint(image_upload_bp)
app.register_blueprint(review_blueprint, url_prefix="/api")
app.register_blueprint(statistics_blueprint, url_prefix="/api")




init_db(app)

with app.app_context():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT DATABASE()")
        db_name = cur.fetchone()[0]
        cur.close()
        print(f"Kết nối thành công: {db_name}")
    except Exception as e:
        print(f"Lỗi kết nối MySQL: {e}")



if __name__ == '__main__':
    app.run(debug=True)