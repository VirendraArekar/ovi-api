const express = require("express");
const rootRouter = express.Router();
// const { checkToken } = require('../middleware/token_validation');

// routes
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const leadRoutes = require("./lead.route");
const councellorRoutes = require("./councellor.route");
const branchRoutes = require('./branch.route')
const countryRoutes = require('./country.route')
const qualificationRoutes = require('./qualification.route')
const sourceRoutes = require('./source.route')
const universityRoutes = require('./university.route')
const roleRoutes = require('./roles.route')
const permissionRoutes = require('./permissions.route')
const counsellorTypeRoutes = require('./counsellor.type.route')
const designationRoutes = require('./designation.route')
const employeeRoutes = require('./employee.route')
const sourceTypeRoutes = require('./source.type.route')
const CollegeRoutes = require('./college.route')
const CityRoutes = require('./city.route')
const DashboardRoutes = require('./dashboard.route')
const EnquiryStatusRoutes = require('./enquiry.status.route')
const ProgrammeRoutes = require('./programme.route')
const LogRoutes = require('./log.route')

// Routes Usage
rootRouter.use("/auth", authRoutes);
rootRouter.use('/dashboard' ,DashboardRoutes )
rootRouter.use("/user", userRoutes);
rootRouter.use("/lead", leadRoutes);
rootRouter.use("/logs", LogRoutes);
rootRouter.use("/enquiry-status", EnquiryStatusRoutes);
rootRouter.use("/councellor", councellorRoutes);
rootRouter.use('/counsellor-type', counsellorTypeRoutes)
rootRouter.use('/college' , CollegeRoutes)
rootRouter.use('/city' , CityRoutes)
rootRouter.use('/designation' , designationRoutes)
rootRouter.use('/employee' , employeeRoutes)
rootRouter.use("/role", roleRoutes);
rootRouter.use("/permission", permissionRoutes);
rootRouter.use("/programme", ProgrammeRoutes);
rootRouter.use("/branch", branchRoutes);
rootRouter.use("/country", countryRoutes);
rootRouter.use("/university", universityRoutes);
rootRouter.use("/source", sourceRoutes);
rootRouter.use("/source-type", sourceTypeRoutes);
rootRouter.use("/qualification", qualificationRoutes);


module.exports = rootRouter;
