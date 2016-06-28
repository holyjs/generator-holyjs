'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function() {
    return this.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Project Name',
      default: this.appname
    },
    {
      type: 'input',
      name: 'authorname',
      message: 'Author Name',
      default: 'Author'
    },
    {
      type: 'input',
      name: 'authoremail',
      message: 'Author Email',
      default: 'example@example.com'
    },
    {
      type: 'input',
      name: 'repository',
      message: 'Git Repository URL',
      default: 'https://github.com/.git'
    }]).then(function (answers) {
      console.log("ANSWERS");
      console.log(answers);
      this.props = answers
      this.log(answers.name);
    }.bind(this));
  },

  writing: {
    config: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          name: this.props.name,
          repository: this.props.repository,
          authorname: this.props.authorname,
          authoremail: this.props.authoremail
        }
      );
    },

    app: function () {

      this.fs.copy(
        this.templatePath('views'),
        this.destinationPath('views')
      );

      this.fs.copyTpl(
        this.templatePath('views/layout.jade'),
        this.destinationPath('views/layout.jade'), {
          name: this.props.name
        }
      );

      this.fs.copyTpl(
        this.templatePath('views/partials/header.jade'),
        this.destinationPath('views/partials/header.jade'), {
          name: this.props.name
        }
      );

      this.fs.copy(
        this.templatePath('config'),
        this.destinationPath('config')
      );

      this.fs.copy(
        this.templatePath('controllers'),
        this.destinationPath('controllers')
      );

      this.fs.copy(
        this.templatePath('middlewares'),
        this.destinationPath('middlewares')
      );

      this.fs.copy(
        this.templatePath('models'),
        this.destinationPath('models')
      );

      this.fs.copy(
        this.templatePath('public'),
        this.destinationPath('public')
      );

      this.fs.copy(
        this.templatePath('strategies'),
        this.destinationPath('strategies')
      );

      this.fs.copy(
        this.templatePath('test'),
        this.destinationPath('test')
      );

      this.fs.copy(
        this.templatePath('.env.example'),
        this.destinationPath('.env.example')
      );

      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copy(
        this.templatePath('app.js'),
        this.destinationPath('app.js')
      );

      this.fs.copy(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        {
          name: this.props.name
        }
      );
    },
  },

  install: function() {
    this.npmInstall();
  }
});
