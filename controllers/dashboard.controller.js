const { default: mongoose } = require('mongoose');
const Lead = require('../models/lead.model');
const Country = require('../models/country.model')
const College = require('../models/college.model')
const moment = require('moment-timezone')
const Logs = require('../models/log.model')
const Branch = require('../models/branch.model')
const Source = require('../models/source.model')
const userModel = require('../models/user.model');

exports.onlineCount = async (req, res, next) => {
    try {
        const facebookCount = await Lead.countDocuments({ leadSource: "6375f9d2a8d7c0fd3b8ab23d" });
        const InstagramCount = await Lead.countDocuments({ leadSource: "6375f9f1a8d7c0fd3b8ab23f" })
        const GoogleCount = await Lead.countDocuments({ leadSource: "63736250fdb3a3bb14287130" })
        const WebsiteCount = await Lead.countDocuments({ leadSource: "637609f48f4929bb3176f6a7" })

        res.status(200).send({
            success: true,
            data: [
                { title: "Google", count: GoogleCount },
                { title: "Facebook", count: facebookCount },
                { title: "Instagram", count: InstagramCount },
                { title: "Website", count: WebsiteCount },
            ],
            message: "Source Count Fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}
exports.offlineCount = async (req, res, next) => {
    try {
        const WalkinCount = await Lead.countDocuments({ leadSource: "6375fc9ba8d7c0fd3b8ab243" })
        const ReferralCount = await Lead.countDocuments({ leadSource: "6375fcd0a8d7c0fd3b8ab245" })
        const DirectCount = await Lead.countDocuments({ leadSource: "6375fcefa8d7c0fd3b8ab247" })
        const HoardingCount = await Lead.countDocuments({ leadSource: "6375fcfaa8d7c0fd3b8ab249" })
        const FareCount = await Lead.countDocuments({ leadSource: "6375fd02a8d7c0fd3b8ab24b" })
        res.status(200).send({
            success: true,
            data: [
                { title: "Walk In", count: WalkinCount },
                { title: "Referral", count: ReferralCount },
                { title: "Direct", count: DirectCount },
                { title: "Hoarding", count: HoardingCount },
                { title: "Fare", count: FareCount },
            ], message: "Source Count Fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.leadGeneratedCouncellorWise = async (req, res, next) => {
    try {
        const { id } = req.params
        const counsellorId = new mongoose.Types.ObjectId(id)
        const countByCouncellor = await Lead.aggregate([
            { '$match': { 'counsellor': counsellorId } },
            { '$sortByCount': { '$month': '$createdAt' } },
            { '$project': { 'month': '$_id', 'count': 1, '_id': 0 } }
        ]).exec()
        res.status(200).send({
            success: true,
            data: countByCouncellor,
            message: "Data fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.telecallerDashboard = async (req, res, next) => {
    try {
        let { ObjectId } = mongoose.Types
        let data = {}
        data.assignedCount = await Lead.find({ assignTo: { $exists: true } }).count()
        const councellor = await userModel.find({ role: "63761b3b80ce99e2d0615ee3" }, { _id: 1 })
        data.assignedCouncellor = await Lead.find({ assignTo: { $in: councellor } }).count()
        data.notRespondedCount = await Lead.find({ "status.name": ObjectId("63899ebba27973d01650c92c") }).count()
        data.notEligibleCount = await Lead.find({ "status.name": ObjectId("63899edca27973d01650c92e") }).count()
        data.loremIpsumCount = 0
        res.status(200).send({
            data: [
                { title: "Assigned Enquiry", count: data.assignedCount },
                { title: "Assigned to Counsellor", count: data.assignedCouncellor },
                { title: "Not Responded", count: data.notRespondedCount },
                { title: "Not Eligible", count: data.notEligibleCount },

            ]
        })
    } catch (error) {
        next(error)
    }
}

exports.counsellorAssigned = async (req, res, next) => {
    try {
        let { ObjectId } = mongoose.Types
        let data = {}
        if (req.query.id) {
            data.assignedCount = await Lead.find({ assignTo: req.query.id }).count()
            data.noResponseCount = await Lead.find({ assignTo: req.query.id, "status.name": ObjectId("6389beb29d8a166febc40386") }).count()
            data.eligibleCount = await Lead.find({ assignTo: req.query.id, "status.name": ObjectId("63a359b68053dd1498f5c3ff") }).count()
            data.futureProspectCount = await Lead.find({ assignTo: req.query.id, "status.name": ObjectId("63a359f40e14f8589cc1040a") }).count()
            data.loremIpsumCount = 0
        } else {
            data.assignedCount = await Lead.find({ assignTo: { $exists: true } }).count()
            data.noResponseCount = await Lead.find({ assignTo: { $exists: true }, "status.name": ObjectId("6389beb29d8a166febc40386") }).count()
            data.eligibleCount = await Lead.find({ assignTo: { $exists: true }, "status.name": ObjectId("63a359b68053dd1498f5c3ff") }).count()
            data.futureProspectCount = await Lead.find({ assignTo: { $exists: true }, "status.name": ObjectId("63a359f40e14f8589cc1040a") }).count()
            data.loremIpsumCount = 0
        }
        res.status(200).send({
            data: [
                { title: "Assigned Enquiry", count: data.assignedCount },
                { title: "No response", count: data.noResponseCount },
                { title: "Eligible", count: data.eligibleCount },
                { title: "Future prospect", count: data.futureProspectCount }
            ]
        })
    } catch (error) {
        next(error)
    }
}

exports.callData = async (req, res, next) => {
    try {
        let { ObjectId } = mongoose.Types
        let data = {}
        data.callAttendedCount = await Lead.find({ "status.name": ObjectId("63899f3aa27973d01650c930") }).count()
        data.callConnectedCount = await Lead.find({ "status.name": ObjectId("63899f53a27973d01650c932") }).count()
        data.notAnsweredCount = await Lead.find({ "status.name": ObjectId("63899f6ca27973d01650c934") }).count()
        data.visaApprovedCount = await Lead.find({ "status.name": ObjectId("63982797d3bf7ec0ecb942c1") }).count()
        data.loremIpsumCount = 0
        res.status(200).send({
            data: [
                { title: "Call Attended", count: data.callAttendedCount },
                { title: "Calls Connected", count: data.callConnectedCount },
                { title: "Not Answered", count: data.notAnsweredCount },
                { title: "Visa Approved", count: data.notAnsweredCount },
            ]
        })
    } catch (error) {
        next(error)
    }
}

exports.statusCountByCounsellor = async (req, res, next) => {
    try {
        const data = {}
        let { ObjectId } = mongoose.Types
        const { id } = req.query
        const counsellorId = new mongoose.Types.ObjectId(id)
        // const countByCounsellor = await Lead.aggregate([
        //     { '$match': { 'assignTo': counsellorId, status: { $exists: true } } },
        //     {
        //         '$facet': {
        //             'counsellor_count': [{ '$count': 'count' }],
        //             'enrolled_counts': [{ '$match': { 'status.name': ObjectId('6389be68b39f94520dc05439') } }, {
        //                 '$group': { '_id': null, 'count': { '$sum': 1 } }
        //             }, { '$project': { 'count': 1, '_id': 0 } }],
        //             'noResponse_counts': [{ '$match': { 'status.name': ObjectId('6389beb29d8a166febc40386') } }, {
        //                 '$group': { '_id': null, 'count': { '$sum': 1 } }
        //             }, { '$project': { 'count': 1, '_id': 0 } }],
        //             'notDisabled_counts': [{ '$match': { 'status.name': ObjectId('6389bee7f05dbdd9a67532a9') } }, {
        //                 '$group': { '_id': null, 'count': { '$sum': 1 } }
        //             }, { '$project': { 'count': 1, '_id': 0 } }],
        //             'dropped_counts': [{ '$match': { 'status.name': ObjectId('6389bf1c2c95729d0b403fd4') } }, {
        //                 '$group': { '_id': null, 'count': { '$sum': 1 } }
        //             }, { '$project': { 'count': 1, '_id': 0 } }],
        //         }
        //     },
        // ])
        let facebookCount, InstagramCount, GoogleCount, WalkinCount, ReferralCount;
        if (req.query.id) {
            facebookCount = await Lead.countDocuments({ 'assignTo': counsellorId, leadSource: "6375f9d2a8d7c0fd3b8ab23d" });
            InstagramCount = await Lead.countDocuments({ 'assignTo': counsellorId, leadSource: "6375f9f1a8d7c0fd3b8ab23f" })
            GoogleCount = await Lead.countDocuments({ 'assignTo': counsellorId, leadSource: "63736250fdb3a3bb14287130" })
            WalkinCount = await Lead.countDocuments({ 'assignTo': counsellorId, leadSource: "6375fc9ba8d7c0fd3b8ab243" })
            ReferralCount = await Lead.countDocuments({ 'assignTo': counsellorId, leadSource: "6375fcd0a8d7c0fd3b8ab245" })
        } else {
            facebookCount = await Lead.countDocuments({ 'assignTo': counsellorId, leadSource: "6375f9d2a8d7c0fd3b8ab23d" });
            InstagramCount = await Lead.countDocuments({ 'assignTo': counsellorId, leadSource: "6375f9f1a8d7c0fd3b8ab23f" })
            GoogleCount = await Lead.countDocuments({ 'assignTo': counsellorId, leadSource: "63736250fdb3a3bb14287130" })
            WalkinCount = await Lead.countDocuments({ 'assignTo': counsellorId, leadSource: "6375fc9ba8d7c0fd3b8ab243" })
            ReferralCount = await Lead.countDocuments({ 'assignTo': counsellorId, leadSource: "6375fcd0a8d7c0fd3b8ab245" })
        }
        res.send({
            data: [
                { title: "Google", count: GoogleCount },
                { title: "Facebook", count: facebookCount },
                { title: "Instagram", count: InstagramCount },
                { title: "Walk In", count: WalkinCount },
                { title: "Referral", count: ReferralCount },
            ],
        })
    } catch (error) {
        next(error)
    }
}

exports.counsellorLeadAssignedVsConverted = async (req, res, next) => {
    try {
        let { ObjectId } = mongoose.Types
        const { id } = req.params;
        const data = await Source.aggregate([
            {
                '$lookup': {
                    'from': 'leads',
                    'localField': '_id',
                    'foreignField': 'leadSource',
                    'pipeline': [
                        {
                            '$match': {
                                assignedTo: ObjectId(id),
                                'status.name': { $not: { $eq: ObjectId('63982797d3bf7ec0ecb942c1') } }
                            }
                        }
                    ],
                    'as': 'assigned'
                }
            }, {
                '$lookup': {
                    'from': 'leads',
                    'localField': '_id',
                    'foreignField': 'leadSource',
                    'pipeline': [
                        {
                            '$match': {
                                assignedTo: ObjectId(id),
                                'status.name': new ObjectId('63982797d3bf7ec0ecb942c1')
                            }
                        }
                    ],
                    'as': 'converted'
                }
            }, {
                '$project': {
                    'source': '$name',
                    'assigned': {
                        '$size': '$assigned'
                    },
                    'converted': {
                        '$size': '$converted'
                    }
                }
            }
        ])
        res.send({ data })
    } catch (error) {
        next(error)
    }
}
exports.leadAssignedVsConverted = async (req, res, next) => {
    try {
        let { ObjectId } = mongoose.Types
        const data = await Logs.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' }, year: { $year: '$createdAt' }
                    }, data: { $push: '$$ROOT' }
                },
            },
            {
                $project:{}
            }
        ])
        res.send({ data })
    } catch (error) {
        next(error)
    }
}

exports.countryWise = async (req, res, next) => {
    try {
        const country = await Country.aggregate([
            {
                '$lookup': {
                    'from': 'leads',
                    'localField': '_id',
                    'foreignField': 'education.countryInterested',
                    'as': 'result'
                }
            }, {
                '$project': {
                    'university': '$name',
                    'total': {
                        '$size': '$result'
                    }
                }
            }
        ]).exec()
        res.send({ success: true, data: country, message: "fetched successfully" })
    } catch (error) {
        next(error)
    }
}

exports.universityWise = async (req, res, next) => {
    try {
        const counts = {}
        const college = await College.aggregate([
            {
                '$lookup': {
                    'from': 'leads',
                    'localField': '_id',
                    'foreignField': 'education.college',
                    'as': 'result'
                }
            }, {
                '$project': {
                    'university': '$name',
                    'total': {
                        '$size': '$result'
                    }
                }
            }
        ]).exec()
        console.log(college)
        res.status(200).send({
            success: true,
            data: college,
            message: "Data fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}
exports.branchWise = async (req, res, next) => {
    try {
        let { ObjectId } = mongoose.Types
        const branch = await Branch.aggregate([
            {
                '$lookup': {
                    'from': 'leads',
                    'localField': '_id',
                    'foreignField': 'branch',
                    'pipeline': [
                        {
                            '$match': {
                                'leadSource': new ObjectId('6375f9d2a8d7c0fd3b8ab23d')
                            }
                        }
                    ],
                    'as': 'facebook'
                }
            },
            {
                '$lookup': {
                    'from': 'leads',
                    'localField': '_id',
                    'foreignField': 'branch',
                    'pipeline': [
                        {
                            '$match': {
                                'leadSource': new ObjectId('6375f9f1a8d7c0fd3b8ab23f')
                            }
                        }
                    ],
                    'as': 'instagram'
                }
            },
            {
                '$lookup': {
                    'from': 'leads',
                    'localField': '_id',
                    'foreignField': 'branch',
                    'pipeline': [
                        {
                            '$match': {
                                'leadSource': new ObjectId('63736250fdb3a3bb14287130')
                            }
                        }
                    ],
                    'as': 'google'
                }
            },
            {
                '$lookup': {
                    'from': 'leads',
                    'localField': '_id',
                    'foreignField': 'branch',
                    'pipeline': [
                        {
                            '$match': {
                                'leadSource': new ObjectId('637609f48f4929bb3176f6a7')
                            }
                        }
                    ],
                    'as': 'website'
                }
            },
            {
                '$project': {
                    'branch': '$name',
                    'Facebook': { '$size': '$facebook' },
                    'Google': { '$size': '$google' },
                    'Website': { '$size': '$website' },
                    'Instagram': { '$size': '$instagram' },
                }
            }
        ]).exec()
        res.status(200).send({
            success: true,
            data: branch,
            message: "Data fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.sourceWise = async (req, res, next) => {
    try {
        const counts = {}
        const branch = await Source.aggregate([
            {
                '$lookup': {
                    'from': 'leads',
                    'localField': '_id',
                    'foreignField': 'leadSource',
                    'as': 'result'
                }
            }, {
                '$project': {
                    'source': '$name',
                    'total': {
                        '$size': '$result'
                    }
                }
            }
        ]).exec()
        res.status(200).send({
            success: true,
            data: branch,
            message: "Data fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.counsellorData = async (req, res, next) => {
    try {
        let { ObjectId } = mongoose.Types
        const { startDate, endDate, country } = req.query
        let data = {}
        if (startDate && endDate && country) {
            data.allApplications = await Lead.find({ "education.college": { $in: country } }).where({
                createdAt: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate),
                },
            }).count()
            // const councellor = await userModel.find({ role: "63761b3b80ce99e2d0615ee3" }, { _id: 1 })
            data.offerPending = await Lead.find({ "status.name": ObjectId("63a34ae2daf2134b7389e8d4"), "education.college": { $in: country } }).where({
                createdAt: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate),
                },
            }).count()
            data.offerReceived = await Lead.find({ "status.name": ObjectId("639827b7d3bf7ec0ecb942c7"), "education.college": { $in: country } }).where({
                createdAt: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate),
                },
            }).count()
            data.payments = await Lead.find({ "status.name": ObjectId("63a34b974122c1604ec7701f"), "education.college": { $in: country } }).where({
                createdAt: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate),
                },
            }).count()

        } else {
            data.allApplications = await Lead.find({}).count()
            // const councellor = await userModel.find({ role: "63761b3b80ce99e2d0615ee3" }, { _id: 1 })
            data.offerPending = await Lead.find({ "status.name": ObjectId("63a34ae2daf2134b7389e8d4") }).count()
            data.offerReceived = await Lead.find({ "status.name": ObjectId("639827b7d3bf7ec0ecb942c7") }).count()
            data.payments = await Lead.find({ "status.name": ObjectId("63a34b974122c1604ec7701f") }).count()
        }
        res.status(200).send({
            data: [
                { title: "All Applications", count: data.allApplications },
                { title: "Offer Pending", count: data.offerPending },
                { title: "Offer Receied", count: data.offerReceived },
                { title: "Payments", count: data.payments },
            ]
        })
    } catch (error) {
        next(error)
    }
}
exports.counsellor = async (req, res, next) => {
    try {
        let { ObjectId } = mongoose.Types
        const { startDate, endDate, country } = req.query
        let data = {}
        if (startDate && endDate && country) {
            data.casPending = await Lead.find({ "status.name": ObjectId("63a350024b1a8f906c6f416d"), "education.college": { $in: country } }).where({
                createdAt: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate),
                },
            }).count()
            // const councellor = await userModel.find({ role: "63761b3b80ce99e2d0615ee3" }, { _id: 1 })
            data.visaApproved = await Lead.find({ "status.name": ObjectId("63982797d3bf7ec0ecb942c1"), "education.college": { $in: country } }).where({
                createdAt: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate),
                },
            }).count()
            data.visaReject = await Lead.find({ "status.name": ObjectId("6398278bd3bf7ec0ecb942be"), "education.college": { $in: country } }).where({
                createdAt: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate),
                },
            }).count()
            // data.payments = await Lead.find({ "status.name": ObjectId("63a34b974122c1604ec7701f"), "education.college": { $in: country } }).where({
            //     createdAt: {
            //         $gte: new Date(startDate),
            //         $lt: new Date(endDate),
            //     },
            // }).count()

        } else {
            data.casPending = await Lead.find({ "status.name": ObjectId("63a350024b1a8f906c6f416d") }).count()
            // const councellor = await userModel.find({ role: "63761b3b80ce99e2d0615ee3" }, { _id: 1 })
            data.visaApproved = await Lead.find({ "status.name": ObjectId("63982797d3bf7ec0ecb942c1") }).count()
            data.visaReject = await Lead.find({ "status.name": ObjectId("6398278bd3bf7ec0ecb942be") }).count()
            // data.payments = await Lead.find({ "status.name": ObjectId("63a34b974122c1604ec7701f") }).count()
        }
        res.status(200).send({
            data: [
                { title: "CAS/COE/000 Pending", count: data.casPending },
                { title: "Visa approved", count: data.visaApproved },
                { title: "Visa rejected", count: data.visaReject },
                { title: "Lorem ipsum", count: 0 },
            ]
        })
    } catch (error) {
        next(error)
    }
}



