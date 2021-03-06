var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		
		if (metaData["citation_url"] == "" || link == null || link == "") return "";
		return (metaData["citation_url"].replace(/\.com\/.*$/,".com") + link.replace(/cite\//,"cite:exportcitation/ris?t:ac=").replace(/\?nojs.*$/,"/$N"));		
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_title: [ ['meta[name="citation_title"]','content'] , ['meta[property="og:title"]','content'] ],
		citation_url: [ ['meta[property="og:url"]','content'] ],
		citation_author: [ ['meta[name="citation_author"]','content'], ['h3.author','innerText'] , ['div#authorInfo strong','innerText'] , ['div#copyrightHolders','innerText'] ],
		citation_date: [ ['meta[property="article:published_time"]','content'] ],
		citation_publisher: [ ['div.publisherTextLabel.group','innerText'] ],
		citation_abstract: [ ['div.articleBody_abstract','innerText', true, 20000] ],
		citation_issn: [ ['dd#isbn','innerText'] , ['meta[name="citation_ISSN"]','content'] ],
		citation_download: [ ['li.cite a.ico-cite','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
