
var score = function(){
	var scores = {};

	this.addPoints = function(user,points){
		if(scores[user] === undefined){
			scores[user] = 0;
		}

		scores[user] += points;
	}

	this.getScore = function(username){
		return scores[username];
	}

	this.getScores = function(){
		return scores;
	}
}

exports.score = new score();