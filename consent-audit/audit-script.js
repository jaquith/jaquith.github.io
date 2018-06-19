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

var output = "";

function addLineToOutput(string) {
    output += "\n" + string;
}


for (var i = 0, cat, catTitle, tags; i < catArr.length; i++) {
    cat = catObj[catArr[i]];
    catTitle = "(title broken)";
    try {catTitle = utui.data.privacy_management.preferences.languages.en.categories[catArr[i]].name;}
    catch(e){}
    addLineToOutput("" + catArr[i] + " | " + catTitle + " | Tag Count: " + cat.tagid.length);
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
            var omittedText = (tagIsOmitted(tag._id)) ? "****OMITTED**** " : "";
            var inactiveText = (tag.status !== "active") ? "****INACTIVE**** " : "";
            addLineToOutput("     ==> " + omittedText + inactiveText + "UID:" + tag._id + " - " + tag.title + " (" + tag.tag_name + ")");
        }
    }
    addLineToOutput("");
}

console.log(output);
tealiumTools.sendMessage(output);

