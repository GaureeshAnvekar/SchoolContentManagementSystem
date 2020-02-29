const express = require("express");
const router = express.Router();

const Schools = require("../../../models/Schools");

// @route     POST api/schools/schoolInfo
// @desc      Returns data to open the first home page of a school. This can be displayed only if the subdomain of that school is in db, i.e. if a school is
//            already registered. So the url that connects to react works only if the subdomain is present in the DNS. If it is present then the
//            subdomain is already present in the db for a school.
// @access    Private  (Only from within the react app) not url
router.post("/", async (req, res) => {
  console.log("light weight");
  console.log(req.body.subDomain);

  try {
    // See if school exists
    const { subDomain } = req.body;
    Schools.findOne();
    let school = await Schools.findOne({ subdomain: subDomain });
    // console.log("admin name " + adminPassword);

    // This can't happen, as DNS already has this subdomain, because of which we reached till here
    if (!school) {
      console.log("Yeah buddy");
      return res.status(404).send("Not Found");
    }
    console.log("found school");
    // Send this global info for this school.
    const payload = {
      schoolInfo: {
        id: school.id,
        subDomain: school.subDomain,
        template: school.template
      }
    };

    return res.json(payload);
  } catch (err) {
    console.error("Error here " + err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
