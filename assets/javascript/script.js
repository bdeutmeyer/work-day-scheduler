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

function timerStart() {
  var startDay = dayjs().format('MMM D, YYYY');
  currentDate.text(startDay);
    setInterval(function() {
        currentDate.text(today);
    }, 1000);
}

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
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //


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
      } else {
        // Find the index of the object with the matching hour property
        var indexToRemove = textBoxContent.findIndex(function(item) {
          return item.hour === idName;
        });
        // If an object with matching hour property is found, removes it from the array
        if (indexToRemove !== -1) {
          textBoxContent.splice(indexToRemove, 1);
          // Updates local storage with the modified textBoxContent array
          localStorage.setItem("text-content", JSON.stringify(textBoxContent));
        }
      }
    }
  }
  
saveBtn.on('click', function(e) {
  e.stopPropagation();
  var idName = $(this).parent().attr('id');
  var userInput = {
    hour: idName,
    content: $(this).siblings('.description').val(),
  }
  textBoxContent.push(userInput);
  localStorage.setItem("text-content", JSON.stringify(textBoxContent));
  keepText();
});

  timerStart();
  colorCode();  
  keepText();
});
