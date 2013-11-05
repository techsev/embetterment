/*
  Responsive Words 
  
  This proof of concept script is just something I threw together on lunch break at work. The idea is to abbreviate words when the screen size of the device is small. Currently just a proof of concept and should not be used on a live site.
   
   Should this script run on the client side? Probably not, I'll probably end up making this into a grunt task if I ever find it to be a good idea.
   
   Should this concept be used in real world websites? Probably not, since any search engine crawlers coming to the site might get different version of the content (It's rumored that google crawlers can now handle javascript and media queries)
   
   I'm considering changing the way I place the alternate text into the html. Currently I wrap the original word in a span, and also append a new span with alt word, but now that means every replaced word is in the code twice. The alternative would be to have the javascript generate CSS styles with span:after tags that in the content field contain the 
  
  Version 0.75
  
  Fixed it so that punctuation gets remove from the start and end of a word sequence then re-added after a replacement is found, so no wrapping space required around punctuation.
  
  Future possible features: I've applied for the API for Abbreviations.com, If I get access, then I'll modify my script to pull from their database instead of my small pre-made arrays.
  
  Version 0.5
  
  Initial proof of concept, punctuations require spaces before and after for words to be replaced correctly.

*/

var sequence = {'laugh out loud': 1, 'laughing out loud': 1, 'adventure': 2,"people": 3, "voice actor": 4, "by the way":5,"mister":6,"responsive web design":7, 'favorite': 8, 'different': 9, 'javascript': 10, 'cascading style sheets': 11 };

var replacement = {1:"LOL", 2: "ADV", 3: "PPL", 4: "V.A.", 5: "BTW", 6: "MR.", 7: "RWD", 8: "FAV", 9: "DIFF", 10: "JS", 11: "CSS"
};

var max_num_words = 3;


function responsiveWords(word_wrapper) {
var content = $(word_wrapper), text = content.html(),
    words = text.split(" "), html = "";
var remove_next = 0;
for (var i = 0; i < words.length; i++) {
  var word_sequence = '';
  var replaced = false;
 
  if (remove_next > 0)
  {
    remove_next--;
    continue;
  }
  
  var pre_sequence_punctuation ="";
  var post_sequence_punctuation ="";
  var temp = '';
  
  for(var j = 0; j< max_num_words; j++)
  {
    word_sequence += " " + words[i+j] ;
    word_sequence = word_sequence.trimLeft();
    temp = word_sequence.charAt(0);
    
    if(temp.match(/[A-Z0-9]/gi) == null)
    {
      pre_sequence_punctuation = word_sequence[0];
      word_sequence = word_sequence.slice(1);
    }
    
    temp = word_sequence.charAt(word_sequence.length-1);
    if(temp.match(/[A-Z0-9]/gi) == null)
    {
      post_sequence_punctuation = word_sequence[word_sequence.length-1];
      word_sequence = word_sequence.slice(0,-1);
    }
    
    
    
    
    
    if(typeof(sequence[word_sequence.toLowerCase()]) !== 'undefined')
    {
      html += pre_sequence_punctuation + "<span class='papabear'>" + word_sequence + "</span><span class='babybear'>"+replacement[sequence[word_sequence.toLowerCase()]]+"</span>"+ post_sequence_punctuation + " ";
      remove_next = j;
      replaced = true;
      break;
    }
  }
  if(!replaced)
  {
    html += words[i] + " ";
  }
  
  
}

$(word_wrapper).html(html);

}