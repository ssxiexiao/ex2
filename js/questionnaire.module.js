angular.module('exApp',['exCtrl','exService','exDirective'])
	.value('htmlContent',{
		"description":{
			"CN":{
				"description_1_content":
					"实验说明：本次实验是为了了解用户对于图形表征的认知能力。我们会给您呈现一系列圆环/圆，请您估计黑色部分占整个圆环/圆的比例（用百分比表示，精确到1%）。实验共分为练习和正式实验两个阶段：<br><br>"+
					"练习阶段：练习阶段由10个试验组成。每次试验后都有准确答案作为反馈，您可以通过练习找到合适的判断策略以做出准确的估计。练习阶段的时间和正确率不会被记录。"+
					"<br><br>"+
					"正式实验：正式实验分为4组，每组由24个试验组成。在正式实验中，每次试验后没有有准确答案作为反馈。正式实验的时间和正确率会被记录。"+
					"<br><br>"+			
					"点击下面的按钮将开始练习。<br>"+
					"提示：请根据比例而非角度或弧度直接输入数字，不需要添加百分号，通过回车可以进入下一个试验。",
				"description_1_next":"开始",
				"train_title":"练习",
				"train_answer":"答案",
				"train_correct_answer":"正确答案",
				"train_next":"下一步",
				"train_complete":"完成",
				"description_2_content":
		            "练习已结束，接下来是正式实验阶段。正式实验分为4组，每组24个试验，每个试验和练习阶段相似，但没有正确答案作为反馈。我们提供向前返回的机会，让您在输入操作失误的时候修改上一个答案（但是不能再往前修改更早之前的答案）。正式实验的判断时间和准确率将被记录。在实验后还有几个小问题，希望您能如实回答一下，谢谢！"+
		            "<br><br>"+
					"点击下面的按钮将开始练习。"+
					"<br>"+
					"提示：请根据比例而非角度或弧度直接输入数字，不需要添加百分号，通过回车可以进入下一个试验。",
				"description_2_next":"开始",
				"userstudy_part_hint":"点击下面的“开始”按钮即开始，在两组之间您可以稍作休息再继续后续的实验。",
	            "userstudy_part_next":"开始",
				"userstudy_title":"请输入你的答案",
				"userstudy_part_message":"组号：",
				"userstudy_answer":"答案",
				"userstudy_error_message":["","输入不能为空", "必须是0到100的整数"],
				"userstudy_prev":"向前",
				"userstudy_next":"下一步",
				"userstudy_complete":"完成",
				"info_title":"填写一下个人信息",
				"info_person_age":"年龄",
				"info_person_gender":"性别",
				"info_person_education":"学历",
				"info_person_major":"专业",
				"info_person_stronghand":"惯用手",
				"info_person_device":"使用设备",
				"info_person_name":"姓名",
				"info_person_department":"单位/学校",
				"info_feedback_question":"您在实验的过程中是根据怎样的线索，使用了怎样的策略来进行估计？",
				"info_skilllevel_question":"您在本实验之前对于此类任务（数量估计）的熟练程度是",
				"info_experience_question":"请问您有多少年使用这类图表的经验",
				"info_complete":"提交",
				"end_message":"谢谢。"
			}, 
			"EN":{
				"description_1_content":
					"Instruction：This study is to understand users' perception of graphical representations. The experiment consists of two stages: the training stage and the formal experiment."+ 
					"<br>"+
					"Each of them consists of several trials. In each trial we will present a donut/circle, and you should estimate the proportion of the black part to the whole(with percentage exact to 1%). "+
					"<br>"+
					"First you will get trained through 10 training trials, after each trial there will be correct answer as feedback, and you could find proper strategy to make better estimation(no need to be absolute exact). "+
					"<br>"+
					"In the training stage time and accuracy won't be recorded. Hint: you can just type numbers without %, and though keyboard enter you can go to the next trial.",
				"description_1_next":"Start",
				"train_title":"Training",
				"train_answer":"Answer",
				"train_correct_answer":"Correct Answer",
				"train_next":"Next",
				"train_complete":"Complete",
				"description_2_content":
		            "Training trials has been finished. Next is the formal experiment. "+
		            "<br>"+
		            "In this stage there will be 4 parts, and each part consists of 24 trials. "+
		            "<br>"+
		            "Each trial is similar to that in the training stage, but without the correct answer as feedback. "+
		            "<br>"+
		            "We provide a pre operation so that you could go back to the pervious trial(not all the previous trials) to change the answer whenever you make a mistake such as type-in error. "+
		            "<br>"+
		            "In the formal experiment accuracy and time will be recorded. After the experiment there will be several questions, and we hope you can answer them truthfully.Thanks for your cooperation.",
				"description_2_next":"Start",
				"userstudy_part_hint":"Push the Start button will start the experiment. Between different parts you can take a breake before going on the following trials.",
	            "userstudy_part_next":"Start",
				"userstudy_title":"Please enter your answer.",
				"userstudy_part_message":"Part ",
				"userstudy_answer":"Answer",
				"userstudy_error_message":["","input cannot be empty", "must be an integer between 0 and 100"],
				"userstudy_prev":"Previous",
				"userstudy_next":"Next",
				"userstudy_complete":"Complete",
				"info_title":"Please fill in your personal information.",
				"info_person_age":"Age",
				"info_person_gender":"Gender",
				"info_person_education":"Education",
				"info_person_major":"Major",
				"info_person_stronghand":"Strong hand",
				"info_person_device":"Device",
				"info_person_name":"Name",
				"info_person_department":"Company/School",
				"info_feedback_question":"What cues or strategies did you leverage in your estimation?",
				"info_skilllevel_question":"Before this experiment, how skilled were you in the similar tasks(quantity estimation)?",
				"info_experience_question":"How many years of experience do you have in using this type of chart?",
				"info_complete":"Submit",
				"end_message":"Thanks."
			}
		}
	});