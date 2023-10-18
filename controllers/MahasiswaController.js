const { isEmail } = require('validator')
const passwordValidator  = require('password-validator');
const bcrypt = require("bcrypt")

const Mahasiswa = require('../models/Mahasiswa')

module.exports = {
    createMahasiswa: async (req, res) => {
        try {
            const mahasiswa = { 
                name: req.body.name,
                address: req.body.address,
                postCode: req.body.postCode,
                email: req.body.email,
                password: req.body.password,
                // password: bcrypt.hash(req.body.password),
            };

            if(!isEmail(mahasiswa.email)){
                return res.status(422).json({
                    status: 'error',
                    message: 'Please fill a valid email address',
                });
            }

            const emailExist = await Mahasiswa.findOne({ email: mahasiswa.email });
            if(emailExist){
                return res.status(409).json({
                    status: 'error',
                    message: 'Email already exist',
                });
            }

            const schema = new passwordValidator();
            schema
                .is().min(8)
                .is().max(20)
                .has().uppercase() 
                .has().lowercase()
                .has().digits(1)
                .has().symbols(1)

            if(!schema.validate(mahasiswa.password)){
                return res.status(422).json({
                    status: 'error',
                    message: 'Password must required one upper case, one digit, one symbols and maximun 20 characters',
                });
            }

            const data = await Mahasiswa.create(mahasiswa);

            return res.status(201).json(data)
        } catch (error) {
            return res.status(404).json({
                status: 'error',
                message: error.message,
            });
        }
    },

    readAllMahasiswa: async (req, res) => {
        try {
            var data;
            data = await Mahasiswa.find();

            return res.status(200).json(data)
        } catch (error) {
            return res.status(404).json({
                status: 'error',
                message: error.message,
            });
        }
    },

    readMahasiswa: async (req, res) => {
        try {
            var data;
            data = await Mahasiswa.findById(req.params.id);

            if(data == null){
                return res.status(404).json({
                    status: 'error',
                    message: 'Cannot find data mahasiswa',
                });
            }

            return res.status(200).json(data)
        } catch (error) {
            return res.status(404).json({
                status: 'error',
                message: 'Cannot find data mahasiswa',
            });
        }
    },

    updateMahasiswa: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, address, postCode } = req.body;
            const data = await Mahasiswa.findOne({ _id: id });

            data.name = name;
            data.address = address;
            data.postCode = postCode;
            data.save();

            return res.status(200).json(data)
        } catch (error) {
            return res.status(404).json({
                status: 'error',
                message: 'Mahasiswa not found',
            });
        }
    },

    deleteMahasiswa: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Mahasiswa.findOne({ _id: id });

            data.deleteOne();
            
            return res.status(200).json({
                status: 'success',
                message: 'Success delete mahasiswa',
            });
        } catch (error) {
            return res.status(404).json({
                status: 'error',
                message: 'Mahasiswa not found',
            });
        }
    },
}