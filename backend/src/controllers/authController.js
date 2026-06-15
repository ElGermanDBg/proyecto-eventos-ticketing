const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password_hash,
      rol: rol || 'cliente'
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email, rol: nuevoUsuario.rol } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Validar password
    const passwordValido = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
