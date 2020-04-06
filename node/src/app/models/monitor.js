
module.exports = (sequelizer, DataTypes) => {
  const Monitors = sequelizer.define('Monitors', {
    monitorDate: {
      type: DataTypes.DATE,
      validate:{
          isDate: true
      }
  },
    hostId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    validate: {
        notEmpty: true,
        notNull: {
            msg: 'É preciso ter um Host associado ao monitor, informe o ID de um host.'
            }
        }
    },
    url: DataTypes.STRING,
    status: DataTypes.STRING,
    statusCod: DataTypes.INTEGER,
    timeResponse: DataTypes.INTEGER
  }, {});
  Monitors.associate = function(models) {
    Monitors.belongsTo(models.Hosts, {
      foreignKey: 'hostId',
      as: 'host',
      onDelete: 'CASCADE',
    })
  };
  
  return Monitors;
};