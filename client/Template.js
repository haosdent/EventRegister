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
	    interestDom = $('input[name="interest"]', registerModal),
	    adviseDom = $('textarea[name="advise"]', registerModal);
	var user = {
	    name: nameDom.val(),
	    email: emailDom.val(),
	    interest: interestDom.val(),
	    advise: adviseDom.val()
	}, userId;

	if(/@/.exec(user.email) === null){
	    Session.set('register_error', '邮箱格式错误');
	    console.log('邮箱格式错误');
	}else if(Users.findOne({email: user.email}) !== undefined){
	    Session.set('register_error', '邮箱已被注册');
	    console.log('邮箱已被注册');
	}else{
	    Session.set('register_error', null);
	    userId = Users.insert(user);
	    registerModal.modal('hide');
	    Session.set('register_status', 'finish');
	};

	nameDom.val('');
	emailDom.val('');
	interestDom.val('');
	adviseDom.val('');
    }
});
