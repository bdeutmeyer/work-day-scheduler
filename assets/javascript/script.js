//Wraps everything so that it doesn't run until the HTML is done rendering
$(function () {
  var currentDate = $('#currentDay');
  var currentHour = dayjs().format('HH');
  var today = dayjs().format('MMM D, YYYY');
  var saveBtn = $('.saveBtn');
  var hour9 = $("#hour-9");
  var hour10 = $("#hour-10");
  var hour11 = $("#hour-11");
  var hour12 = $("#hour-12");
  var hour13 = $("#hour-13");
  var hour14 = $("#hour-14");
  var hour15 = $("#hour-15");
  var hour16 = $("#hour-16");
  var hour17 = $("#hour-17");
  var hourArray = [hour9, hour10, hour11, hour12, hour13, hour14, hour15, hour16, hour17];
  var textBoxContent = JSON.parse(localStorage.getItem("text-content")) || [];

//Puts current date at top of page
  function timerStart() {
    var startDay = dayjs().format('MMM D, YYYY');
    currentDate.text(startDay);
    setInterval(function() {
        currentDate.text(today);
    }, 1000);
  }

//Loops through hourArray, compares hour to current hour, color codes according to past, present, or future status
  function colorCode() {
    for (i = 0; i < hourArray.length; i++) {
      if (i < currentHour - 9) {
        hourArray[i].removeClass("future present");
        hourArray[i].addClass("past");
      } else if (i == currentHour - 9) {
        hourArray[i].removeClass("future past");
        hourArray[i].addClass("present");
      } else {
        hourArray[i].removeClass("past present");
        hourArray[i].addClass("future");
      }
    }
  }

//Loops through hourArray, sets text content based on local storage
  function keepText() {
    for (var i = 0; i < hourArray.length; i++) {
      // Matches the hour property with the IDs in hourArray
      var idName = hourArray[i].attr('id');
      if (hourArray[i].children('.description').val() !== "") {
        for (var j = 0; j < textBoxContent.length; j++) {
          if (textBoxContent[j].hour === idName) {
            hourArray[i].children('.description').val(textBoxContent[j].content);
            break;
          }
        }
      }
    }
  }
  
//Event listener. On click, creates object of id and text content. If text field is empty, clears that object out of local storage and sets text content to empty string. Otherwise, adds object to overall array and saves to local storage
  saveBtn.on('click', function() {
    var idName = $(this).parent().attr('id');
    var userInput = {
      hour: idName,
      content: $(this).siblings('.description').val(),
    }

    if ($(this).siblings('.description').val() === '') {
      var index = textBoxContent.findIndex(function(object) {
      return object.hour === idName;
      });
      textBoxContent.splice(index, 1);
      localStorage.setItem("text-content", JSON.stringify(textBoxContent));
    } else { 
      textBoxContent.push(userInput);
      localStorage.setItem("text-content", JSON.stringify(textBoxContent));
      keepText();
    }
  });

  timerStart();
  colorCode();  
  keepText();
});