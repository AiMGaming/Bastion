/*
 * Copyright (C) 2017 Sankarsan Kampa
 *                    https://sankarsankampa.com/contact
 *
 * This file is a part of Bastion Discord BOT.
 *                        https://github.com/snkrsnkampa/Bastion
 *
 * This code is licensed under the SNKRSN Shared License. It is free to
 * download, copy, compile, use, study and refer under the terms of the
 * SNKRSN Shared License. You can modify the code only for personal or
 * internal use only. However, you can not redistribute the code without
 * explicitly getting permission fot it.
 *
 * Bastion BOT is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY. See the SNKRSN Shared License for
 * more details.
 *
 * You should have received a copy of the SNKRSN Shared License along
 * with this program. If not, see <https://github.com/snkrsnkampa/Bastion/LICENSE>.
 */

exports.run = function(Bastion, message, args) {
  if (args.length < 2 || !args.join(' ').endsWith('?')) return;
  let outcomes = [
  	'It\'s certain',
  	'It\'s decidedly so',
  	'Without a doubt',
  	'Yes definitely',
  	'You may rely on it',
  	'As I see it, yes',
  	'Most likely',
  	'Outlook good',
  	'Yes',
  	'Signs point to yes',
  	'Reply hazy try again',
  	'Ask again later',
  	'Better not tell you now',
  	'Cannot predict now',
  	'Concentrate and ask again',
  	'Don\'t count on it',
  	'My reply is no',
  	'My sources say no',
  	'Outlook not so good',
  	'Very doubtful'
  ];

  message.channel.sendMessage('', {embed: {
    color: 6651610,
    title: args.join(' '),
    description: outcomes[Math.floor(Math.random()*outcomes.length)],
    footer: {
      text: '🎱 Magic 8-ball'
    }
  }}).catch(e => {
    Bastion.log.error(e.stack);
  });
};

exports.conf = {
  aliases: ['8ball']
};

exports.help = {
  name: 'magic8ball',
  description: 'Ask the Magic 8-Ball a polar (yes/no) question.',
  permission: '',
  usage: ['magic8ball Do I need a new lease on life?']
};