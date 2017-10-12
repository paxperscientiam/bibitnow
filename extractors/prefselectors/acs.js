var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		var returnString = "http://pubs.acs.org";
		returnString += link;
		return returnString.replace(/showCitFormats/,"downloadCitation");
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_journal_title: [ ['div#series-logo img','alt'] ],
		citation_volume: [ ['div#citation span.citation_volume','innerText'] ],
		citation_misc: [ ['div#citation','innerText'] ],
		citation_issn: [ ['a#rightsAndPermissions','href'] ],
		citation_download: [ ['a[title="Download Citation"]', 'href'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
