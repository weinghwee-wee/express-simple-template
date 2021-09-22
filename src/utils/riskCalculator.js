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
        case (riskScore < 2):
            return 1
        case (riskScore < 5):
            return 2
        case (riskScore < 8):
            return 3
        case (riskScore < 10):
            return 4
        default:
            return 5
    }
}
