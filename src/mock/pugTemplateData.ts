export const pugTemplateTemplates: any = [
	{
		filename: 'src',
		value: '',
		path: 'src',
		kind: 'directory',
		children: [
			{
				filename: 'index.pug',
				value: `body
    .pug
      .head
      .left-ear
      .right-ear
      .left-wrinkles
      .right-wrinkles
      .right-eye
        .right-eye-ball
      .left-eye
        .left-eye-ball
      .mouth
      .left-mouth
      .right-mouth
      .bottom-mouth
      .nose
    h2
      | pug is watching u ~
    .modal-dialog
        .modal-content
          // Modal Header
          .modal-header
            button.close(type="button", data-dismiss="modal")
              span(aria-hidden="true") ×
              span.sr-only Close
            h4#myModalLabel.modal-title
              |  Edit Resource
          // Modal Body
          .modal-body
            //#editForm.form(role='form' method='GET' action='https://www.google.com/')
            form(role='form' method='GET' action='https://www.google.com/')
              div.form-group
                label(for='name') Name:
                input#name.form-control(type='text', placeholder='name' name='name')
              div.form-group
                label(for='email') Email:
                input#email.form-control(type='email', placeholder='name@email.com' name='email')
              button.btn.btn-primary(type="submit", name="asdf") Submit
              button.btn.btn-default(type="button", data-dismiss="modal")
                | Close
`,
				path: 'src/index.pug'
			},
			{
				filename: 'index.js',
				value: ` console.log('pug init !')`,
				path: 'src/index.js'
			},
			{
				filename: 'index.scss',
				value: `body {
    button {
        margin: 0 10px;
    }
    h2 {
        margin-top: -65px;
        position: absolute;
        width: 100%;
        text-align: center;
        color: #fff;
    }
    background:#a86454;
}
.modal-dialog {
    margin-top: 280px;
}
.pug {
    width: 550px;
    height: 425px;
    margin: auto;
    overflow: auto;
    position: absolute;
    div {
        position: absolute;
    }
    div:after,
    div:before {
        position: absolute;
        content: '';
    }
    scale: 0.5;
    display: flex;
    align-items: center;
    left: 70px;
    transform: translate(-50%, 0px);
    top: -100px;
}
.head {
    width: 330px;
    height: 340px;
    left: 110px;
    top: 5px;
    background: #efdec2;
    border-top-left-radius: 150px;
    border-top-right-radius: 150px;
    border-bottom-left-radius: 75px;
    border-bottom-right-radius: 75px;

    -webkit-box-shadow: inset 3px -3px 30px rgba(0, 0, 0, 0.45);
    box-shadow: inset 3px -3px 30px rgba(0, 0, 0, 0.45);
}
.left-ear {
    width: 150px;
    height: 205px;
    top: 10px;
    left: 40px;
    background: #17262b;
    border-top-left-radius: 55px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 15px;

    -webkit-transform: skew(0, -5deg);
    transform: skew(0, -5deg);

    -webkit-box-shadow: inset 13px 13px 50px rgba(0, 0, 0, 0.75);
    box-shadow: inset 13px 13px 50px rgba(0, 0, 0, 0.75);
}
.left-ear:before {
    display: none;
    width: 35px;
    height: 50px;
    bottom: -10px;
    left: 38px;
    background: #fff;
    border-radius: 15px;
}
.left-ear:after {
    width: 200px;
    height: 235px;
    top: 15px;
    left: 75px;
    background: #efdec2;
    border-radius: 50px;
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    -webkit-box-shadow: inset 6px -5px 20px rgba(0, 0, 0, 0.25);
    box-shadow: inset 6px -5px 20px rgba(0, 0, 0, 0.25);
}
.right-ear {
    width: 150px;
    height: 200px;
    top: 10px;
    right: 40px;
    background: #17262b;

    border-top-right-radius: 55px;
    border-top-left-radius: 25px;
    border-bottom-right-radius: 15px;
    -webkit-transform: skew(0, 5deg);
    transform: skew(0, 5deg);

    -webkit-box-shadow: inset -13px 13px 50px rgba(0, 0, 0, 0.75);
    box-shadow: inset -13px 13px 50px rgba(0, 0, 0, 0.75);
}
.right-ear:after {
    width: 200px;
    height: 235px;
    top: 15px;
    right: 75px;
    background: #efdec2;
    border-radius: 50px;
    -webkit-transform: rotate(-30deg);
    transform: rotate(-30deg);
}
.left-eye {
    width: 140px;
    height: 175px;
    top: 90px;
    left: 110px;
    background: #efdec2;
    border-radius: 75px;
    border-top-right-radius: 25px;

    -webkit-box-shadow:
        -1px 3px 3px rgba(0, 0, 0, 0.25),
        1px -3px 3px rgba(0, 0, 0, 0.25),
        inset 3px -3px 20px rgba(0, 0, 0, 0.25);
    box-shadow:
        -1px 3px 3px rgba(0, 0, 0, 0.25),
        1px -3px 3px rgba(0, 0, 0, 0.25),
        inset 3px -3px 20px rgba(0, 0, 0, 0.25);

    -webkit-transform: rotate(-20deg);
    transform: rotate(-20deg);
}
.left-eye:before {
    width: 100px;
    height: 125px;
    left: 20px;
    top: 15px;
    background: #17262b;
    border-top-left-radius: 50px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;

    -webkit-box-shadow: inset -3px 1px 7px rgba(0, 0, 0, 0.95);
    box-shadow: inset -3px 1px 7px rgba(0, 0, 0, 0.95);
}
.left-eye-ball {
    width: 70px;
    height: 70px;
    left: 35px;
    top: 35px;
    border-radius: 50%;
    background: #674833;
    -webkit-box-shadow: inset -1px 2px 12px rgba(0, 0, 0, 0.95);
    box-shadow: inset -1px 2px 12px rgba(0, 0, 0, 0.95);
}
.left-eye-ball:before {
    width: 40px;
    height: 40px;
    top: 15px;
    left: 15px;
    background: #000;
    border-radius: 50%;
}
.left-eye-ball:after {
    width: 20px;
    height: 20px;
    top: 5px;
    left: 20px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.75);
}
.right-eye {
    width: 140px;
    height: 175px;
    top: 90px;
    right: 110px;
    background: #efdec2;
    border-radius: 75px;
    border-top-left-radius: 25px;

    -webkit-box-shadow:
        -1px 3px 3px rgba(0, 0, 0, 0.25),
        1px -3px 3px rgba(0, 0, 0, 0.25),
        inset 3px -3px 20px rgba(0, 0, 0, 0.25);
    box-shadow:
        -1px 3px 3px rgba(0, 0, 0, 0.25),
        1px -3px 3px rgba(0, 0, 0, 0.25),
        inset 3px -3px 20px rgba(0, 0, 0, 0.25);

    -webkit-transform: rotate(20deg);
    -moz--transform: rotate(20deg);
    transform: rotate(20deg);
}
.right-eye:before {
    width: 100px;
    height: 125px;
    left: 20px;
    top: 15px;
    background: #17262b;
    border-top-right-radius: 50px;
    border-top-left-radius: 25px;
    border-bottom-right-radius: 25px;

    -webkit-box-shadow: inset -3px 1px 7px rgba(0, 0, 0, 0.95);
    box-shadow: inset -3px 1px 7px rgba(0, 0, 0, 0.95);
}
.right-eye-ball {
    width: 70px;
    height: 70px;
    left: 35px;
    top: 35px;
    border-radius: 50%;
    background: #674833;

    -webkit-box-shadow: inset -1px 2px 12px rgba(0, 0, 0, 0.95);
    box-shadow: inset -1px 2px 12px rgba(0, 0, 0, 0.95);
}
.right-eye-ball:before {
    width: 40px;
    height: 40px;
    top: 15px;
    left: 15px;
    background: #000;
    border-radius: 50%;
}
.right-eye-ball:after {
    width: 20px;
    height: 20px;
    top: 10px;
    left: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.75);
}
.mouth {
    width: 215px;
    height: 215px;
    top: 150px;
    left: 167px;
    background: #d4bea9;
    border-radius: 40%;
    border-bottom-left-radius: 50%;

    background: -webkit-radial-gradient(left bottom, #17262b 70%, #efdec2 86%);
    background: -moz-radial-gradient(left bottom, #17262b 70%, #efdec2 86%);

    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
}
.left-mouth {
    width: 130px;
    height: 180px;
    bottom: 60px;
    left: 143px;
    background: #17262b;

    border-top-left-radius: 200px;
    border-bottom-left-radius: 50px;

    -webkit-box-shadow:
        -3px -2px 5px rgba(0, 0, 0, 0.95),
        inset 6px -6px 45px rgba(0, 0, 0, 0.95);
    box-shadow:
        -3px -2px 5px rgba(0, 0, 0, 0.95),
        inset 6px -6px 45px rgba(0, 0, 0, 0.95);
}
.right-mouth {
    width: 130px;
    height: 180px;
    right: 143px;
    bottom: 60px;
    background: #d4bea9;

    border-top-right-radius: 200px;
    border-bottom-right-radius: 50px;

    -webkit-box-shadow:
        -3px -2px 5px rgba(0, 0, 0, 0.95),
        inset 6px -6px 45px rgba(0, 0, 0, 0.95);
    box-shadow:
        -3px -2px 5px rgba(0, 0, 0, 0.95),
        inset 6px -6px 45px rgba(0, 0, 0, 0.95);

    background: #17262b;
}
.bottom-mouth {
    width: 100px;
    height: 100px;
    background: #d4bea9;

    border-radius: 50%;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;

    bottom: 52px;
    left: 225px;

    -webkit-box-shadow:
        inset -1px 3px 15px rgba(0, 0, 0, 0.95),
        inset -6px -6px 45px rgba(0, 0, 0, 0.95);
    box-shadow:
        inset -1px 3px 15px rgba(0, 0, 0, 0.95),
        inset -6px -6px 45px rgba(0, 0, 0, 0.95);
    background: #151e25;
    z-index: 1;
}
.nose {
    width: 70px;
    height: 70px;
    top: 170px;
    left: 240px;
    background: #0e1419;

    border-radius: 50%;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;

    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
}
.left-wrinkles {
    width: 120px;
    height: 130px;
    top: 60px;
    left: 135px;

    border-radius: 30%;
    -moz-border-radius: 30%;

    -webkit-transform: rotate(-20deg);
    -moz-transform: rotate(-20deg);
    transform: rotate(-20deg);

    -webkit-box-shadow: 3px -1px 5px rgba(0, 0, 0, 0.45);
    -moz-box-shadow: 3px -1px 5px rgba(0, 0, 0, 0.45);
    box-shadow: 3px -1px 5px rgba(0, 0, 0, 0.45);
}
.right-wrinkles {
    width: 130px;
    height: 130px;
    top: 60px;
    right: 135px;

    border-radius: 30%;
    -moz-border-radius: 30%;

    -webkit-transform: rotate(20deg);
    -moz-transform: rotate(20deg);

    -webkit-box-shadow: -3px -1px 5px rgba(0, 0, 0, 0.45);
    -moz-box-shadow: -3px -1px 5px rgba(0, 0, 0, 0.45);
    box-shadow: -3px -1px 5px rgba(0, 0, 0, 0.45);
}
`,
				path: 'src/index.scss'
			}
		]
	}
];
