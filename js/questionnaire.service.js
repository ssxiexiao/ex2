angular.module('exService',[])
	.factory('RecordService', function($http) {
		var shuffle = function (aArr){
			var iLength = aArr.length,
			    i = iLength,
		        mTemp,
		        iRandom,
		        count = 10;
			    while(i--){
			        if(i !== (iRandom = Math.floor(Math.random() * iLength))){
			            mTemp = aArr[i].slice(0);
			            aArr[i] = aArr[iRandom].slice(0);
			            aArr[iRandom] = mTemp;
			        }
			    }
			    return aArr;
		};
		var writeUrl = './server/write.php',
			readUrl = './server/read.php';
		var id = undefined;
		var latestIndice = 1,
			answers = [],
			datas = [],
			costs = [],
			personInfo = {},
			feedback = undefined,
			favourite = undefined,
			accurate = undefined,
			skillLevel = undefined,
			upload = false,
			experience = undefined;
		var service = {
			saveAnswer: function(answer, time, indice) {
				answers[indice] = answer;
				costs[indice] += time;
			},
			getId: function(){
				return id;
			},
			getDataFromServer: function(){
				$http({
					url: readUrl,
					method: "POST",
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: ''
				}).success(function(data){
					id = data['id'];
					var thickness = [0, 0.735, 0.98];
					var state = [];
					for(var i = 0; i < 3; i++){
						for(var j = 0; j < 2; j++){
							for(var k = 0; k < 2; k++){
								if(!(i === 0 && k === 1))
									state.push([thickness[i], j, k]);
							}
						}
					}
					for(var i = 0; i < data['angles'].length; i+=10){
						for(var j = i; j < i+10; j++){
							var tmp = state[j-i].slice(0);
							tmp.splice(1,0,data['angles'][j]);
							datas.push(tmp);
						}
					}
					shuffle(datas);
					console.log(datas);
					for(var i = 0; i < datas.length; i++){
						answers.push(undefined);
						costs.push(0);
					}
				})
				.error(function(data,header,config,status){
					;
				});
			},
			getDataNumber: function(){
				return datas.length;
			},
			getDataByIndice: function(indice){
				return datas[indice];
			},
			getAnswerByIndice:function(indice){
				return answers[indice];
			},
			updateInfo: function(info) {
				personInfo = info.personInfo;
				feedback = info.feedback;
				favourite = info.favourite;
				accurate = info.accurate;
				skillLevel = info.skillLevel;
				experience = info.experience;
			},
			updateLatest: function(indice){
				latestIndice = Math.max(latestIndice, indice);
			},
			latest: function(){
				return latestIndice;
			},
			postData: function() {
				var postData = {
					'id': id,
					'personInfo': personInfo,
					'datas': datas,
					'answers': answers,
					'costs': costs,
					'feedback': feedback,
					'favourite': favourite,
					'accurate': accurate,
					'skillLevel': skillLevel,
					'experience': experience
				};
				$http({
					url: writeUrl,
					method: "POST",
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: postData
				}).success(function(data){
					data = parseInt(data);
					if(data === 1){
						alert('Success.');
						upload = true;
					}
					else{
						alert('Fail! Please submit one more time.')
					}
				})
				.error(function(data,header,config,status){
					;
				});
			},
			getUploadStatus:function(){
				return upload;
			}
		};
		return service;
	});