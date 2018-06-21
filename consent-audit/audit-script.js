(function runConsentAudit() {

    //tealiumTools.send("Running...");

    // make sure the utui object is there
    if (typeof utui === "undefined") {
        tealiumTools.send("Error: please make sure you're logged into TiQ (and have the TiQ UI as your active tab) to use this tool.");
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
    var uids_accounted_for = [];

    function addCatToObject (subCatName, tags, catAuditObj) {
        var catTitle = "";
        // should do something more elegant with the language at some point, currently only works with English
        try {catTitle = utui.data.privacy_management.preferences.languages.en.categories[catName].name;}
        catch(e){}
        if (typeof subCatName === "string" && subCatName != "" ) {
            catAuditObj[subCatName] = {};
            catAuditObj[subCatName].title = catTitle;
            catAuditObj[subCatName].tags = [];
            targetObj = catAuditObj[subCatName];
            tagArr = targetObj.tags;
        } else {
            catAuditObj.tags = [];
            targetObj = catAuditObj;
            tagArr = targetObj.tags;
        }
        

        for (var j = 0, tag, tagId, newTagArr; j < tags.length; j++) {
            var tagId = tags[j].tag_id;
            var isUID = false;
            // for tags that have a UID (Tealium Tags), use that one instead
            if (tags[j].id) {
                tagId = tags[j].id;
                isUID = true; 
            }
            newTagArr = getTags(tagId, isUID);
            // isOn is where the Consent Preferences omission status is stored
            for (var k = 0, isOmitted, isInactive, targetArr; k < newTagArr.length; k++) {
                tag = newTagArr[k];
                uids_accounted_for.push(tag._id);
                isOmitted = tags[j].isOn == false || tagIsOmittedExplicitConsent(tag._id);
                isInactive = tag.status !== "active";
                tagArr.push({"uid" : tag._id, "title" : tag.title, "name": tag.tag_name, "is_omitted" : isOmitted, "is_inactive" : isInactive, "should_bold" : isOmitted && !isInactive, "should_grey" : isInactive});
            }
        }

        targetObj.tagCount = tagArr.length;
    }


    // will return a list of all the tag UIDs in the profile if no arguments are provided
    function getTags(idString, isUID) {
        var idField = isUID ? "_id" : "tag_id"; // default to the UID (instead of tag_id, the internal one)
        var containerObj = utui.manage.containerMap;
        var containerKeys = Object.keys(containerObj);
        var tags = [];
        for (var i = 0; i < containerKeys.length; i++) {
            // push selected tags if an idString is provided
            if (typeof idString !== "undefined") {
                if (containerObj[containerKeys[i]][idField] == idString) {
                    tags.push(containerObj[containerKeys[i]]);
                }
            }
            // if no idString arguement provided, push all the tags into the array
            else {
                tags.push(containerObj[containerKeys[i]])
            }
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
    auditObj.uncategorized = {};
    auditObj.categories = {};

    for (var i = 0, tags; i < catArr.length; i++) {
        addCatToObject(catArr[i], catObj[catArr[i]].tagid, auditObj.categories);
    }

    var all_tags = getTags();
    var missing_tags = all_tags.filter(tag => uids_accounted_for.indexOf(tag._id) === -1);

    // flag these as omitted regardless of the status?
    addCatToObject(null, missing_tags, auditObj.uncategorized);


   /* for (i = 0, tag; i < missing_tags.length; i++) {
        tag = missing_tags[i];
        // utui.data.privacy_management.preferences.categories.personalization.tagid.push({tag_name: "Tealium Pixel (or Iframe) Container", isOn: true, id: "XXX", tag_id: "20011"})
        // don't accidentally add the collect tag
        if (tag.tag_name !== "Tealium Collect") {
            utui.data.privacy_management.preferences.categories.social.tagid.push({"tag_name": tag.tag_name, "isOn": true, "id": tag.id, "tag_id": tag.tag_id})
        }
    } */
    

    //console.log(uids_accounted_for);
    //console.log(missing_tags);
    tealiumTools.send(auditObj);
}())



