function bmr(gender, weight, height, age) {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

function calorieCalc(gender, weight, height, age, gweight, diffDays, kgToKcal = 7700, bmrcalc = bmr) {
      let currentWeight = weight,
        weightDiff,
        calsToLoseTotal,
        basicMetabolicRate,
        maxCalsPerDay,
        newWeightDiff,
        daysCounter = diffDays,
        display = document.getElementById("display");


      for (var i = 0; i < diffDays; i++) {
        weightDiff = currentWeight - gweight;
        calsToLoseTotal = weightDiff * kgToKcal;
        calsToLosePerDay = (calsToLoseTotal / daysCounter).toFixed(2);
        basicMetabolicRate = bmrcalc(gender, currentWeight, height, age);
        maxCalsPerDay = (basicMetabolicRate - calsToLosePerDay).toFixed(2);

        currentWeight = ((currentWeight * kgToKcal - calsToLosePerDay) / kgToKcal).toFixed(2);
        display.innerHTML += "<h3 style='display: block; margin-bottom: 15px;'> Day " + i + ": &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Max calories: " + maxCalsPerDay + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Weight: " + currentWeight + "</h3>";
        daysCounter--;
      }
}

// get difference in days by using bulletproof moment.js
function dateDiffInDays(finishDate) {
  let start = moment(),
       diff = start.diff(finishDate, 'days');
  return diff * -1;
}

document.addEventListener("DOMContentLoaded", function() {
  button = document.getElementById("values");
  button.addEventListener('click', function() {
    var gender = document.getElementById("gender").value,
        height = document.getElementById("height").value,
        weight = document.getElementById("weight").value,
       gweight = document.getElementById("goal_weight").value,
           age = document.getElementById("age").value,
         fdate = document.getElementById("finish_date").value;

    let diffDays = dateDiffInDays(fdate),
        result = calorieCalc(
          gender,
          weight,
          height,
          age,
          gweight,
          diffDays
        );
  }, false);
});
