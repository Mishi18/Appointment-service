const Enum = require('enum')
const Status =new Enum({

    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    BOOKED: 'BOOKED'

})

module.exports = Status