class PokemonsController < ApplicationController

  def create
    trainer = Trainer.find_by(id: params[:pokemon][:trainer_id])
    if trainer.pokemons.count < 6
      pokemon = trainer.pokemons.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
      render json: pokemon, except: [:created_at, :updated_at]
    else
      render json: { message: 'ERROR: A trainer can only have 6 Pokemon.' }
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: pokemon, except: [:created_at, :updated_at]
  end

end
