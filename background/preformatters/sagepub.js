var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix abbreviation
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//properly separate volume from issue in misc field
		metaData["citation_misc"] = metaData["citation_misc"].replace(/issue/i,", issue");
		
		//separate pages if available
		let bibField = metaData["citation_firstpage"].split(/[\-]+/);
		if (bibField != null && bibField.length > 1 && metaData["citation_lastpage"] == "") {
			metaData["citation_firstpage"] = bibField[0].trim();
			metaData["citation_lastpage"] = bibField[1].trim();
		}
		
		//extract correct date
		bibField = metaData["citation_date"].match(/published:(.*)$/);
		if (bibField == null || bibField.length < 2) bibField = metaData["citation_date"].match(/published online:(.*)$/);
		if (bibField != null && bibField.length == 2) metaData["citation_date"] = bibField[1].replace(/^[^:]*[:]/,"").trim();
		       
		//prefer static abstract
		if (metaData["citation_abstract"] != "" && (metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			metaData["citation_abstract"] = "";
		}		
	}
	
	// expose preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
