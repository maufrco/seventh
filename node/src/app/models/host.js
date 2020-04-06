
module.exports = (sequelizer, DataTypes) => {
  const Hosts = sequelizer.define('Hosts', {
    name: DataTypes.STRING,
    protocol: {
      type:DataTypes.ENUM,
      values: ["https://", "http://"],
      validate:{
          isIn: {
              args: [['http://', 'https://']],
              msg:  "O campo protocol não pode ser vazio, escolha entre http:// ou https://"
            },
            notEmpty: true
      }
  },
    domain:{
      type:DataTypes.STRING,
      validate:{
          notEmpty: true,
          notContains: ["https://", "http://"],   
      }
  },

    path: DataTypes.STRING
  }, {});
  Hosts.associate = function(models) {
    Hosts.hasMany(models.Monitors, {
      foreignKey: 'hostId',
      as: 'results',
      onDelete: 'CASCADE',
    });
  };
  return Hosts;
};