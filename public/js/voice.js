function voiceStart(e) {
  $(".voice-img").hide();
  $(".voice-radio").show();
  annyang.start();
}

function voiceEnd(e) {
  $(".voice-img").show();
  $(".voice-radio").hide();
  annyang.abort();
}

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    "search*name": function (text) {
      console.log("text", text);
      let content = text.split("name")[0];
      document.querySelector("#Search").value = content.trim();
      setTimeout(() => {
        document.querySelector("#SearchBt").click();
      }, 2000);
    },
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  annyang.addCallback("resultMatch", function (userSaid, commandText, phrases) {
    console.log(userSaid); // sample output: 'hello'
    console.log(commandText); // sample output: 'hello (there)'
    console.log(phrases);
  });

  annyang.addCallback(
    "resultNoMatch",
    function (userSaid, commandText, phrases) {
      console.log(userSaid); // sample output: 'hello'
      console.log(commandText); // sample output: 'hello (there)'
      console.log(phrases);
    }
  );
}
