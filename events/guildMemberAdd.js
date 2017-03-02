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

const sql = require('sqlite');
sql.open('./data/Bastion.sqlite');

module.exports = member => {
  sql.get(`SELECT greet, greetMessage, greetChannelID, greetTimeout FROM guildSettings WHERE guildID ='${member.guild.id}'`).then(row => {
    if (row.greet == 'true') {
      let greetMsg = row.greetMessage;
      greetMsg = greetMsg.replace(/\$user/, `<@${member.id}>`);
      greetMsg = greetMsg.replace(/\$server/, member.guild.name);
      greetMsg = greetMsg.replace(/\$username/, member.displayName);
      greetMsg = greetMsg.replace(/\$prefix/, member.client.config.prefix);

      member.guild.channels.get(row.greetChannelID).sendMessage('', {embed: {
        color: 5088314,
        title: `Hello ${member.displayName}`,
        description: greetMsg
      }}).then(m => {
        if (row.greetTimeout > 0) m.delete(1000*parseInt(row.greetTimeout)).catch(e => {
          member.client.log.error(e.stack);
        });
      }).catch(e => {
        member.client.log.error(e.stack);
      });
    }
  }).catch(e => {
    member.client.log.error(e.stack);
  });

  sql.get(`SELECT log, logChannelID FROM guildSettings WHERE guildID ='${member.guild.id}'`).then(row => {
    if (row.log == 'false') return;
    member.guild.channels.get(row.logChannelID).sendMessage('', {embed: {
      color: 5088314,
      title: 'User Joined',
      fields: [
        {
          name: 'Username',
          value: `**${member.user.username}**#${member.user.discriminator}`,
          inline: true
        },
        {
          name: 'ID',
          value: member.id,
          inline: true
        },
        {
          name: 'Joined At',
          value: member.joinedAt.toUTCString(),
          inline: false
        }
      ]
    }}).catch(e => {
      member.client.log.error(e.stack);
    });
  }).catch(e => {
    member.client.log.error(e.stack);
  });
};