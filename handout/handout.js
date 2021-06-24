$("document").ready(function(){
		countStart=0;
		activeView="welcomeContainer";

		$("#openHandoutBtn1").click(function(){$("#"+activeView).hide(); $("#fudmaHandoutContainer").show(); activeView="fudmaHandoutContainer";});
		$("#openHandoutBtn2").click(function(){$("#"+activeView).hide(); $("#fudmaHandoutContainer").show(); activeView="fudmaHandoutContainer";});
		$("#backToDeptList").click(function(){$("#"+activeView).hide(); $("#fudmaHandoutContainer").show(); activeView="fudmaHandoutContainer";});
		$("#backToHomeMenu1").click(function(){$("#"+activeView).hide(); $("#welcomeContainer").show(); activeView="welcomeContainer";});
		$("#backToHomeMenu2").click(function(){$("#"+activeView).hide(); $("#welcomeContainer").show(); activeView="welcomeContainer";});
		$("#nextDeptList").click(function(){$(this).text("Loading..."); countStart+=20; getDeptList(countStart,1); });
		
		
		getDeptList(countStart,1);

		$("#newDeptForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
					
					   url: "strickers/addNewDept.php",
					   type: "POST",
					   data:  new FormData(this),
					   contentType: false,
							 cache: false,
					   processData:false,
						beforeSend : function()
					   {
						$("#newDeptBtn").addClass("disabled");
						$("#newDeptBtn").text("Adding...");
						
					   },
					   success: function(data)
						  {
							 if(data==0){
							 	swal("Success !!","New Department Added, Refresh The Page If Its Not Yet On The List.","success");
							 	getDeptList(); }
							 else{swal("Error !!","Department Not Added"+data,"error");}

							$("#newDeptBtn").removeClass("disabled");
							$("#newDeptBtn").html('<i class="fa fa-book"></i> Add'); 
							
						  } 
						
						});
				
			
		}));

		$("#newHandoutForm").on("submit",(function(e){
			e.preventDefault();
			
			if($("#levelSelect").val()=="NULL"){swal("Opps!!","Please Select A Level","info");}
			else{
					$.ajax({
					
					   url: "strickers/uploadHandout.php",
					   type: "POST",
					   data:  new FormData(this),
					   contentType: false,
							 cache: false,
					   processData:false,
						beforeSend : function()
					   {
						$("#newHandoutBtn").addClass("disabled");
						$("#newHandoutBtn").text("Uploading...");
						
					   },
					   success: function(data)
						  {
							 if(data==0){
							 	swal("Success !!","New Material Uploaded, Refresh The Page If Its Not Yet On The List.","success");
							 	/*getDeptList();*/ }
							 else{swal("Error !!","Material Not Uploaded: "+data,"error");}

							$("#newHandoutBtn").removeClass("disabled");
							$("#newHandoutBtn").html('<i class="fa fa-book"></i> Add'); 
							
						  } 
						
						});
				}
			
		}));

	});

function getDeptList(count,refresh){

				if(refresh=="0"){$("#refreshDeptList").text('Refreshing...');
					 var url="strickers/getDeptList.php?countStart=0"; countStart=0;}
				else{var url="strickers/getDeptList.php?countStart="+count;}

				$.getJSON(url,function(data){
					
					var i=0;
					var text='';
					var fullText='';
					
					if(data.length==0){swal("Opps!!","There Are No More Department To Show, If You Cant Find Your Department In The List, Please Help Us Create The Department In The New Department Area To Help Your Self And Others.","info");}
					else{
							for(i=0;i<data.length;i++){
							
							text='<li class="list-group-item" id="deptRow'+i+'"><i class="fa fa-angle-double-right"></i>';
							text+=' <a href="#top" class="text-bold text-black" onclick="getDeptContent('+data[i].id+','+i+',1)">'+data[i].deptName+'</a></li>';
							fullText=fullText+text; }

						fullText='<ul class="list-group"><li class="list-group-item active text-bold">Department List</li>'+fullText+'</ul>';
							$("#deptList").html(fullText);
						
						}
						if(countStart!=0){$("#nextDeptList").html('<i class="fa fa-cloud-download "></i> Load More');}
						if(refresh==0){$("#refreshDeptList").html('<i class="fa fa-refresh "></i> Refresh');}
			});	
}

function getDeptContent(dept,row,refresh){
		
		if(refresh==0){var url="strickers/getDeptContent.php?refresh=0"; $("#refreshHandoutList").text('Refreshing...');}
		else{
				var myRow=$("#deptRow"+row).html(); var url="strickers/getDeptContent.php?dept="+dept; 
				$("#deptRow"+row).html('<b class="text-success">Loading Content......</b>');
			}
				
				$.getJSON(url,function(data){
					
					var i=0;
					var text='';
					var level1='';
					var level2='';
					var level3='';
					var level4='';
					var level5='';
					var fullText='';

					
					
					for(i=0;i<data.length;i++){
						
						text='<li class="list-group-item"><a href="'+data[i].dir.replace("../","")+'" class="btn btn-primary btn-sm" download>';
						text+='<i class="fa fa-download"></i></a> '+data[i].course+'</li>';
						
						if(data[i].level=="100"){level1=level1+text;}
						if(data[i].level=="200"){level2=level2+text;}
						if(data[i].level=="300"){level3=level3+text;}
						if(data[i].level=="400"){level4=level4+text;}
						if(data[i].level=="500"){level5=level5+text;}
					}

					
					if(level1==""){level1='<li class="list-group-item alert alert-warning"><b>Opps!!, No Item Here Yet.</b></li>';}
					if(level2==""){level2='<li class="list-group-item alert alert-warning"><b>Opps!!, No Item Here Yet.</b></li>';}
					if(level3==""){level3='<li class="list-group-item alert alert-warning"><b>Opps!!, No Item Here Yet.</b></li>';}
					if(level4==""){level4='<li class="list-group-item alert alert-warning"><b>Opps!!, No Item Here Yet.</b></li>';}
					if(level5==""){level5='<li class="list-group-item alert alert-warning"><b>Opps!!, No Item Here Yet.</b></li>';}

					fullText='<ul class="list-group">';
					fullText+='<li class="active list-group-item">100 Level Material</li>'+level1;
					fullText+='<li class="active list-group-item">200 Level Material</li>'+level2;
					fullText+='<li class="active list-group-item">300 Level Material</li>'+level3;
					fullText+='<li class="active list-group-item">400 Level Material</li>'+level4;
					fullText+='<li class="active list-group-item">500 Level Material</li>'+level5;
					fullText+='</ul>';
							
					$("#handoutList").html(fullText);
					$("#"+activeView).hide(); $("#deptContentContainer").show(); activeView="deptContentContainer";
					if(refresh==0){$("#refreshHandoutList").html('<i class="fa fa-refresh"></i> Refresh');}
					else{$("#deptRow"+row).html(myRow);}
						
			});	
					
}