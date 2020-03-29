module.exports = (sequelizer, DataTypes) => {

    const host = sequelizer.define("hosts", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type:DataTypes.STRING
        },
        protocol:{
            type:DataTypes.ENUM,
            values: ['http://', 'https://'],
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
        path: {
            type:DataTypes.STRING
        }
    },{
        timestamps: false,
        freezeTableName: true 
      });
    //   host.associate = function (models) { host.belongsTo(models.monitor, {  
    //     foreignKey: 'hostId',  
    //     targetKey: 'id'  
    //     });  
    //   };
      
    return host;
}