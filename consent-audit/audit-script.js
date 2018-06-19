var catObj = utui.data.privacy_management.preferences.categories;
var catArr = Object.keys(catObj);

function getTagById(idString, idField) {
    idField = idField || "_id"; // default to the UID (instead of tag_id, the internal one)
    var containerObj = utui.manage.containerMap;
    var containerKeys = Object.keys(containerObj);
    for (var i = 0; i < containerKeys.length; i++) {
        if (containerObj[containerKeys[i]][idField] == idString) return containerObj[containerKeys[i]];
    }
}

function tagIsOmitted(uid) {
    var delim = ",";
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
    auditObj[catArr[i]].tagCount = cat.tagid.length;
    auditObj[catArr[i]].tags = [];
    if (cat.tagid.length !== 0) {
        tags = cat.tagid;
        for (var j = 0, tag, tagId, tagIdString; j < tags.length; j++) {
            var tagId = tags[j].tag_id;
            var tagIdString = "tag_id";
            // for tags that have a UID (Tealium Tags), use that one instead
            if (tags[j].id) {
                tagId = tags[j].id;
                tagIdString = "_id"; // yep, this is different...
            }
            tag = getTagById(tagId, tagIdString)
            var isOmitted = tagIsOmitted(tag._id);
            var isInactive = tag.status !== "active";
            auditObj[catArr[i]].tags.push({"uid" : tag._id, "title" : tag.title, "name": tag.tag_name, "is_omitted" : isOmitted, "is_inactive" : isInactive, "should_bold" : isOmitted && !isInactive, "should_grey" : isInactive});
        }
    }
}

//console.log(output);
console.log(auditObj);
tealiumTools.send(auditObj);

