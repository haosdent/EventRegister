/*
 * @name: Template.js
 * @author: Haosdent Huang
 * @email: haosdent@gmail.com
 * @date: 2012-12-08
 * @overview: Handle views by templates.
 */

Template.register.status = function(){
    return Session.get('register_status');
};
Template.register.successed = function(){
    var result = false;
    if(Session.get('register_status') == 'finish'){
	result = true;
    };

    return result;
};
Template.register.error = function(){
    return Session.get('register_error');
};
Template.register.events({
    'click .ex-submit': function(evt){
	evt.preventDefault();
	Session.set('register_status', 'start');

	var registerModal = $('#register-modal');
	var nameDom = $('input[name="name"]', registerModal),
	    emailDom = $('input[name="email"]', registerModal),
	    collegeDom = $('input[name="college"]', registerModal),
	    gradeDom = $('input[name="grade"]', registerModal),
	    specialtyDom = $('input[name="specialty"]', registerModal),
	    organizeDom = $('input[name="organize"]', registerModal),
	    adviseDom = $('textarea[name="advise"]', registerModal);
	var user = {
	    name: nameDom.val(),
	    email: emailDom.val(),
	    college: collegeDom.val(),
	    grade: gradeDom.val(),
	    specialty: specialtyDom.val(),
	    organize: organizeDom.val(),
	    advise: adviseDom.val()
	}, userId;

	if(/@/.exec(user.email) === null){
	    Session.set('register_error', '请检查您输入的邮箱格式');
	}else if(user.name === ""){
	    Session.set('register_error', '请输入您的姓名');
	}else if(Users.findOne({email: user.email}) !== undefined){
	    Session.set('register_error', '请输入的邮箱已被注册，请换另一个邮箱地址');
	}else{
	    Session.set('register_error', null);
	    userId = Users.insert(user);
	    registerModal.modal('hide');
	    Session.set('register_status', 'finish');
	};

	nameDom.val('');
	emailDom.val('');
	collegeDom.val('');
	gradeDom.val('');
	specialtyDom.val('');
	organizeDom.val('');
	adviseDom.val('');
    }
});
