from flask import Flask, request, redirect
import sqlite3
import os

app = Flask(__name__)

# Crear base de datos si no existe
def init_db():
    if not os.path.exists('clientes.db'):
        conn = sqlite3.connect('clientes.db')
        c = conn.cursor()
        c.execute('''CREATE TABLE clientes (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nombre TEXT,
                        perfil TEXT,
                        pin TEXT,
                        correo TEXT,
                        clave TEXT,
                        telefono TEXT
                    )''')
        conn.commit()
        conn.close()

init_db()

@app.route('/', methods=['GET', 'POST'])
def home():
    buscar = request.args.get('buscar', '')

    if request.method == 'POST':
        nombre = request.form['nombre']
        perfil = request.form['perfil']
        pin = request.form['pin']
        correo = request.form['correo']
        clave = request.form['clave']
        telefono = request.form['telefono']

        conn = sqlite3.connect('clientes.db')
        c = conn.cursor()
        c.execute("INSERT INTO clientes (nombre, perfil, pin, correo, clave, telefono) VALUES (?, ?, ?, ?, ?, ?)",
                  (nombre, perfil, pin, correo, clave, telefono))
        conn.commit()
        conn.close()
        return redirect('/')

    conn = sqlite3.connect('clientes.db')
    c = conn.cursor()

    if buscar:
        c.execute("SELECT * FROM clientes WHERE nombre LIKE ?", ('%' + buscar + '%',))
    else:
        c.execute("SELECT * FROM clientes ORDER BY correo")  # Ordenar por correo

    clientes = c.fetchall()
    conn.close()

    html = '''
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Agenda de Clientes 📞</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Agenda de Clientes 📞</h1>

        <form method="get" class="row g-3 mb-4">
            <div class="col-md-10">
                <input type="text" name="buscar" class="form-control" placeholder="Buscar cliente por nombre..." value="''' + buscar + '''">
            </div>
            <div class="col-md-2 d-grid">
                <button type="submit" class="btn btn-primary">Buscar</button>
            </div>
        </form>

        <form method="post" class="row g-3 mb-4">
            <div class="col-md-4">
                <input type="text" name="nombre" class="form-control" placeholder="Nombre real" required>
            </div>
            <div class="col-md-4">
                <input type="text" name="perfil" class="form-control" placeholder="Nombre de perfil" required>
            </div>
            <div class="col-md-4">
                <input type="text" name="pin" class="form-control" placeholder="PIN de seguridad" required>
            </div>
            <div class="col-md-4">
                <input type="email" name="correo" class="form-control" placeholder="Correo electrónico" required>
            </div>
            <div class="col-md-4">
                <input type="password" name="clave" class="form-control" placeholder="Clave secreta" required>
            </div>
            <div class="col-md-4">
                <input type="text" name="telefono" class="form-control" placeholder="Teléfono" required>
            </div>
            <div class="col-md-12 d-grid">
                <button type="submit" class="btn btn-success">Agregar Cliente</button>
            </div>
        </form>

        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Perfil</th>
                    <th>PIN</th>
                    <th>Correo</th>
                    <th>Clave</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    '''
    
    # Mostrar clientes ordenados por correo
    for cliente in clientes:
        html += f"""
            <tr>
                <td>{cliente[0]}</td>
                <td>{cliente[1]}</td>
                <td>{cliente[2]}</td>
                <td>{cliente[3]}</td>
                <td>{cliente[4]}</td>
                <td>{cliente[5]}</td>
                <td>{cliente[6]}</td>
                <td>
                    <a href='/eliminar/{cliente[0]}' class="btn btn-danger btn-sm" onclick="return confirm('¿Estás seguro que quieres eliminar este cliente?');">
                        🗑️ Eliminar
                    </a>
                </td>
            </tr>
        """

    html += '''
            </tbody>
        </table>
    </div>
    </body>
    </html>
    '''
    return html

@app.route('/eliminar/<int:id>')
def eliminar(id):
    conn = sqlite3.connect('clientes.db')
    c = conn.cursor()
    c.execute("DELETE FROM clientes WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)
