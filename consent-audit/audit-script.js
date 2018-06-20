(function runConsentAudit() {

    // make sure the utui object is there
    if (typeof utui === "undefined") {
        tealiumTools.send("Error: please make sure you're logged into TiQ to use this tool.");
        return;
    }

    var isExplicitActive = (utui.data.privacy_management && utui.data.privacy_management.explicit && utui.data.privacy_management.explicit.isEnabled);
    var isPreferencesActive = (utui.data.privacy_management && utui.data.privacy_management.preferences && utui.data.privacy_management.preferences.isEnabled);

    if (!isExplicitActive || !isPreferencesActive) {
        tealiumTools.send("Error: This tool is only tested for profiles with both Consent Manager components active, get in touch with caleb.jaquith@tealium.com to get your use case added.");
        return;
    }


    var catObj = utui.data.privacy_management.preferences.categories;
    var catArr = Object.keys(catObj);

    function getTagsById(idString, isUID) {
        var idField = isUID ? "_id" : "tag_id"; // default to the UID (instead of tag_id, the internal one)
        var containerObj = utui.manage.containerMap;
        var containerKeys = Object.keys(containerObj);
        var tags = [];
        for (var i = 0; i < containerKeys.length; i++) {
            if (containerObj[containerKeys[i]][idField] == idString) tags.push(containerObj[containerKeys[i]]);
        }
        return tags;
    }

    // checks the Explicit Consent omission list, the Consent Preferences are checked elsewhere
    function tagIsOmittedExplicitConsent(uid) {
        var delim = ",";
        // check the explicit consent list first
        var omittedTags = delim + utui.data.privacy_management.explicit.omittedTags + delim;
        var tagString = delim + uid + delim;
        var pos = omittedTags.indexOf(tagString);
        return pos !== -1; 
    }

    var auditObj = {};

    for (var i = 0, cat, catTitle, tags; i < catArr.length; i++) {
        cat = catObj[catArr[i]];
        catTitle = "(title broken)";
        try {catTitle = utui.data.privacy_management.preferences.languages.en.categories[catArr[i]].name;}
        catch(e){}
        auditObj[catArr[i]] = {};
        auditObj[catArr[i]].title = catTitle;
        auditObj[catArr[i]].tags = [];
        if (cat.tagid.length !== 0) {
            tags = cat.tagid;
            for (var j = 0, tag, tagId, tagIdString; j < tags.length; j++) {
                var tagId = tags[j].tag_id;
                var isUID = false;
                // for tags that have a UID (Tealium Tags), use that one instead
                if (tags[j].id) {
                    tagId = tags[j].id;
                    isUID = true; 
                }
                newTagArr = getTagsById(tagId, isUID);

                // isOn is where the Consent Preferences omission status is stored
                for (var k = 0; k < newTagArr.length; k++) {
                    tag = newTagArr[k];
                    var isOmitted = tags[j].isOn == false || tagIsOmittedExplicitConsent(tag._id);
                    var isInactive = tag.status !== "active";
                    auditObj[catArr[i]].tags.push({"uid" : tag._id, "title" : tag.title, "name": tag.tag_name, "is_omitted" : isOmitted, "is_inactive" : isInactive, "should_bold" : isOmitted && !isInactive, "should_grey" : isInactive});
                }
            }
        }
        auditObj[catArr[i]].tagCount = auditObj[catArr[i]].tags.length;
    }

    //console.log(output);
    //console.log(auditObj);
    tealiumTools.send(auditObj);
}())



