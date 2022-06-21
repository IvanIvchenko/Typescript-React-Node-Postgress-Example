import { DataTypes, ModelDefined, Optional } from "sequelize"

interface NoteAttributes {
  id: number,
  nickname: string,
  real_name: string,
  content: string,
  origin_description: string,
  superpowers: string,
  catch_phrase: string,
  mainImage: string,
  images: string[]
}

type NoteCreationAttributes = Optional<NoteAttributes, 'real_name' | 'origin_description' | 'superpowers' | 'catch_phrase' | 'images'>;

const Superhero = (sequelize: any, Sequelize: any) => {
  const Superhero: ModelDefined<NoteAttributes, NoteCreationAttributes> = sequelize.define("superhero", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    nickname: {
      type: Sequelize.STRING,
    },
    real_name: {
      type: Sequelize.STRING
    },
    origin_description: {
      type: Sequelize.STRING,
    },
    superpowers: {
      type: Sequelize.STRING
    },
    catch_phrase: {
      type: Sequelize.STRING
    },
    mainImage: {
      type: Sequelize.STRING
    },
    images: {
      type: Sequelize.ARRAY(DataTypes.STRING)
    }
  });
  return Superhero;
}
export default Superhero 