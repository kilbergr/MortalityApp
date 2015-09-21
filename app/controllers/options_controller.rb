class OptionsController < ApplicationController
  def index
  	@search = Demographic.search(params[:q])
  	@demographics = @search.result
  	# @q = Figure.ransack(params[:q])
  	# @figures = @q.result.includes(:deaths)

  	# @deaths = Death.all
  	# @demographics = Demographic.all 
  	
  end

  def show
  	@dem = Demographic.find_by_id(3000)
  end

end
