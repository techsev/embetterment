/*
  Responsive Words 
  
  This proof of concept script is just something I threw together on lunch break at work. The idea is to abbreviate words when the screen size of the device is small. Currently just a proof of concept and should not be used on a live site.
   
   Should this script run on the client side? Probably not, I'll probably end up making this into a grunt task if I ever find it to be a good idea.
   
   Should this concept be used in real world websites? Probably not, since any search engine crawlers coming to the site might get different version of the content (It's rumored that google crawlers can now handle javascript and media queries)
   
   I'm considering changing the way I place the alternate text into the html. Currently I wrap the original word in a span, and also append a new span with alt word, but now that means every replaced word is in the code twice. The alternative would be to have the javascript generate CSS styles with span:after tags that in the content field contain the 
  
  Version 0.76

    after getting api access to Abreviations.com, I made changes to the script to call their API instead of checking against my list of words. Unfortunatly, since each word gets tested against the database up to 3 times, I blasted through the 1000 calls per day limit in 5 minutes. I decided to remove the code, as it's not feasible to use the api.
    


  Version 0.75
  
  Fixed it so that punctuation gets remove from the start and end of a word sequence then re-added after a replacement is found, so no wrapping space required around punctuation.
  
  Future possible features: I've applied for the API for Abbreviations.com, If I get access, then I'll modify my script to pull from their database instead of my small pre-made arrays.
  
  Version 0.5
  
  Initial proof of concept, punctuations require spaces before and after for words to be replaced correctly.

*/


/* Data definition */
var sequence = {'laugh out loud': 1, 'laughing out loud': 1, 'adventure': 2,"people": 3, "voice actor": 4, "by the way":5,"mister":6,"responsive web design":7, 'favorite': 8, 'different': 9, 'javascript': 10, 'cascading style sheets': 11 };
var replacement = {1:"LOL", 2: "ADV", 3: "PPL", 4: "V.A.", 5: "BTW", 6: "MR.", 7: "RWD", 8: "FAV", 9: "DIFF", 10: "JS", 11: "CSS"};
var max_num_words = 3; //Max Number of words in a sequence to test against data

var abbr_call_url = "http://www.stands4.com/services/v2/abbr.php?uid=3063&tokenid=WLhSRfuKXotPzoC9&searchtype=r&term=";

var useApi = false;


function responsiveWords(word_wrapper) {
  var content = $(word_wrapper), text = content.html(),
      words = text.split(" "), html = "";
  
  var remove_next = 0; // counter for number of words to skip over if a sequence of words is to found to have a replacement
  
  for (var i = 0; i < words.length; i++) {
    var word_sequence = '';
    var replaced = false;
   
    if (remove_next > 0)
    {
      remove_next--;
      continue;
    }
    
    var pre_sequence_punctuation ="", post_sequence_punctuation ="", temp = '';
    
    for(var j = 0; j< max_num_words; j++)
    {
      word_sequence += " " + words[i+j] ;
      word_sequence = word_sequence.trimLeft();
      temp = word_sequence.charAt(0);
      
      if(temp.match(/[A-Z0-9]/gi) == null) //If the first char of the word sequence is not alphanumeric.
      {
        pre_sequence_punctuation = word_sequence[0];
        word_sequence = word_sequence.slice(1);
      }
      
      temp = word_sequence.charAt(word_sequence.length-1);
      if(temp.match(/[A-Z0-9]/gi) == null) // If the last char of the word sequence is not alphanumeric
      {
        post_sequence_punctuation = word_sequence[word_sequence.length-1];
        word_sequence = word_sequence.slice(0,-1);
      }
      
      if (useApi)        
      {
        /*
          I was planning to use the Abbreviations.com api to check for 
          possible abbreviations, however, they only allow for 1000 api calls 
          a day, and since my script would do up to 3 abbreviation checks per word.
          If I had a paragraph of text with about 100 words, I would end up maxing out 
          my daily limits after 4 run-throughs. 

          I'm not sure how much more work to put into this script considering I don't 
          even know the impact of it on SEO and web crawlers. I believe this might be as far as I go.
        */
         
      } else {
        if(typeof(sequence[word_sequence.toLowerCase()]) !== 'undefined')
        {
          html += pre_sequence_punctuation + "<span class='papabear'>" + word_sequence + "</span><span class='babybear'>"+replacement[sequence[word_sequence.toLowerCase()]]+"</span>"+ post_sequence_punctuation + " ";
          remove_next = j;
          replaced = true;
          break;
        }
      }
    }
    if(!replaced)
    {
      html += words[i] + " ";
    }
    
    
  }

  $(word_wrapper).html(html);

}