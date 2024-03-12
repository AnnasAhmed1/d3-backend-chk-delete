module.exports = (sequelize, DataTypes) => {
	const cuisine = sequelize.define(
		'cuisine',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			created_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			modified_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
		},
		{
			/**
			 * By default, sequelize will automatically transform all passed model names into plural
			 * References: https://sequelize.org/master/manual/model-basics.html#table-name-inference
			 */
			tableName: 'cuisine',
		},
	);

	cuisine.associate = (models) => {
		cuisine.belongsTo(models.status, {
			foreignKey: 'status_id',
			onDelete: 'CASCADE',
		});
	};

	return cuisine;
};
