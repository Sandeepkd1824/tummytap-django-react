# 🍽️ TummyTap

TummyTap is a modern food ordering app backend built with Django + DRF and managed using Poetry.  
It supports user authentication, product listings, cart management, diet plans, and more.

---

## 🚀 Features

- Custom user authentication (email-based with OTP)
- Product and category management
- Cart and order system
- Reviews and favorites
- Diet plans and special events
- Fully modular architecture

---

## 🧑‍💻 Tech Stack

- Python 3.11+
- Django 4.x
- Django REST Framework
- PostgreSQL (recommended)
- Poetry for dependency management
- JWT Authentication

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/tummytap.git
cd tummytap

poetry install

cd backend
poetry shell

cp .env.example .env

poetry add python-decouple

poetry run python manage.py migrate
poetry run python manage.py runserver





 curl --location 'http://127.0.0.1:8000/api/products/' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
