const getTaskModel =  (sequelize, { DataTypes }) => {
    const Task = sequelize.define("task", {
        description : {
          type: DataTypes.STRING,
          allowNull: false, 
          validate: {
            notEmpty: true,
            },
        },
        finish : {
          type : DataTypes.BOOLEAN,
          defaultValue: false,
        }
    })

    return Task;
}

export default getTaskModel;