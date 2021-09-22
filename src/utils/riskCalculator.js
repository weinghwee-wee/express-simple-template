// get the total risk score to determine the risk index
module.exports.calculateRiskScore = (questionObjects) => {
    let riskScore = 0
  
    questionObjects.forEach(questionObject => {
      riskScore = riskScore + questionObject.weightage
    })
  
    return riskScore
  }
  
// get the total risk score to determine the risk index
module.exports.getRiskIndexBasedonRiskScore = (riskScore) => {
    switch (true) {
        case (riskScore <=4):
            return 1
        default:
            return 2
    }
}
