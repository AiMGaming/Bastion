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
  let outcomes = [
    ':one:',
    ':two:',
    ':three:',
    ':four:',
    ':five:',
    ':six:'
  ];
  let outcome = outcomes[Math.floor(Math.random()*outcomes.length)];
  if (args[0] && parseInt(args[0]))
    for (var i = 1; i < args[0]; i++)
      outcome += outcomes[Math.floor(Math.random()*outcomes.length)]

  message.channel.sendMessage('', {embed: {
    color: 6651610,
    title: 'You rolled:',
    description: outcome
  }}).catch(e => {
    Bastion.log.error(e.stack);
  });
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: 'roll',
  description: 'Rolls a dice and gives you the the outcome. If a number is provided as an argument, it rolls that no. of dices.',
  permission: '',
  usage: ['roll', 'roll 5']
};