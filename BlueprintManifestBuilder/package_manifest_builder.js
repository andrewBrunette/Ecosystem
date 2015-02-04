

$("#welcome_modal").modal('show');

/******* Setup parameters ******/
$("#chooser_container .parameter").draggable({
	revert: "invalid",
	helper: "clone",
	cancel: "",
});

$("#built_els").droppable({
	accept: ".parameter",
	hoverClass: "built_parameter_hover",
	drop:  function(event,ui){
		switch(ui.draggable[0].id)  {
			// Standard Params
			case 'param_string':
				/* TODO - move to custom and apply regex option */
				GenerateGenericParamEl(ui.draggable[0].id,ui.helper,"Free-form string.");
				break;
			case 'param_numeric':
				GenerateGenericParamEl(ui.draggable[0].id,ui.helper,"Numeric string.");
				break;
			case 'param_password':
				GenerateGenericParamEl(ui.draggable[0].id,ui.helper,"Numeric string.");
				break;
			case 'param_network':
				GenerateGenericParamEl(ui.draggable[0].id,ui.helper,"Drop down to select an available network.");
				break;
			case 'param_serverip':
				GenerateGenericParamEl(ui.draggable[0].id,ui.helper,"Drop down to select an available server - both already existing and those scheduled to be built with the current Blueprint.  Returns the IP address of the selected server.");
				break;
			case 'param_server':
				GenerateGenericParamEl(ui.draggable[0].id,ui.helper,"Drop down to select an available server - both already existing and those scheduled to be built with the current Blueprint.  Returns the name selected server.");
				break;

			// System params.  These don't need any el_details
			case 'param_user':
				GenerateSystemParamEl(ui.draggable[0].id,ui.helper,"Include the control portal username that is initiating the deployment.");
				break;
			case 'param_name':
				GenerateSystemParamEl(ui.draggable[0].id,ui.helper,"Include the name of server deployment is executing on.");
				break;
			case 'param_ip':
				GenerateSystemParamEl(ui.draggable[0].id,ui.helper,"Include the IP of server deployment is executing on.");
				break;
			case 'param_serverpassword':
				GenerateSystemParamEl(ui.draggable[0].id,ui.helper,"Include the password for the server on which the deployment is executing.");
				break;

			// Option params
			case 'param_select':
				GenerateOptionParamEl(ui.draggable[0].id,ui.helper,"Select one option from a list of several.");
				break;
			case 'param_option':
				GenerateOptionParamEl(ui.draggable[0].id,ui.helper,"Select zero or more options from a list of several.");
				break;
		};
	},
});



function GenerateGenericParamEl(src_id,example_el,help_text)
{
	el = $("#builder_el_tpl").clone().removeAttr("id").addClass(src_id);
	el.find(".example_field").append(example_el[0].innerHTML);
	el.find(".el_help").prepend(help_text);
	el.appendTo("#built_els");
}


function GenerateSystemParamEl(src_id,example_el,help_text)
{
	el = $("#builder_el_tpl").clone().removeAttr("id").addClass(src_id);
	el.find(".example_field").append(example_el[0].innerHTML);
	el.find(".el_details").remove();
	el.find(".el_help").removeClass("col-md-offset-1").removeClass("col-md-5").addClass("col-md-11").html(help_text);
	el.appendTo("#built_els");
}


function GenerateOptionParamEl(src_id,example_el,help_text)
{
	el = $("#builder_el_tpl").clone().removeAttr("id").addClass(src_id);
	el.find(".example_field").append(example_el[0].innerHTML);
	el.find(".el_help").prepend(help_text);
	el.find(".el_details").append($("#options_tpl").clone().removeAttr("id"));
	el.appendTo("#built_els");
}



/******* Panel accordions ******/
$("#built_els").on("click",".builder_el .panel-heading",function(e){
	if ($(e.target).hasClass(".el_btn_menu") || $(e.target).parents(".el_btn_menu").length)  {
		// no-op - clicking the button menu
	}  else if ($(e.target).hasClass("name") && !$(this).parents(".builder_el").hasClass("inactive"))  {
		// no-op - editting name field and already expanded
	}  else if ($(this).parents(".builder_el").hasClass("inactive"))  {
		$("#built_els .builder_el").addClass("inactive").removeClass("panel-info");
		$(this).parents(".builder_el").toggleClass("inactive").toggleClass("panel-info");
	}  else  {
		$(this).parents(".builder_el").toggleClass("inactive").toggleClass("panel-info");
	}
});


/******* Button click handlers  ******/
$("#built_els").on("click",".delete_btn",function(){
	$(this).parents(".builder_el").remove();
}).on("click",".clone_btn",function(){
	$(this).parents(".builder_el").clone().insertAfter($(this).parents(".builder_el"));
}).on("click",".remove_option_btn",function(){
	$(this).parent().remove();
}).on("click",".add_option_btn",function(){
	el = $(this).prev().clone();
	el.find("input").val("");
	el.insertBefore(this);
});


/******* Bootstrap ******/
$("#uuid").val('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	return v.toString(16);
}));


/******* Data extract ******/
$("#export_xml_btn").click(function(){
	// Foundational els
	manifest = {
		'metadata': {
			'name': $("input[name=package_name]").val(),
	     	'description': $("textarea[name=package_description]").val(),
	     	'uuid': $("input[name=package_uuid]").val(),
		},
		'execution': {
			'mode': $("select[name=package_mode]").val()
		},
	};

	// variable parameters
	$(".builder_el:not(#builder_el_preamble)").each(function(){
	});

	// TODO finalize execution command

	console.log(manifest);

});


