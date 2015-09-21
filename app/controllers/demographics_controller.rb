class DemographicsController < ApplicationController
 	before_filter :set_search
 
  def index
  	@search.state_eq = "United States" &&
  	@search.race_eq = "Black" &&
  	@search.ethnicity_eq = "Hispanic" unless params[:q]
  	@demographics = @search.result

  	@figures = []
  	@deaths = []
		@search.result.each do |dem|
			dem_id = dem.id 
			@figure = Figure.find(dem_id)
			@figures.push(@figure)
		end

		@figures.each do |figure|
			death_id = figure.death_id
			@death = Death.find(death_id)
			@deaths.push(@death)
		end

  end

	def set_search
		@search=Demographic.search(params[:q])
	end

end

 
  # def index
  # 	@demographics = @search.result
  # 	@figures = []
		# @search.result.each do |dem|
		# 	dem_id = dem.id 
		# 	@figure = Figure.find(dem_id)
		# 	@figures.push(@figure)
		# end
		# binding.pry
  # end