const { Router } = require('express');
const {
    readAllMahasiswa,
    readMahasiswa,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
} = require('../controllers/MahasiswaController');

const router = Router();

router.get('/', readAllMahasiswa);
router.get('/:id', readMahasiswa);
router.post('/', createMahasiswa);
router.put('/:id', updateMahasiswa);
router.delete('/:id', deleteMahasiswa);

module.exports = router;