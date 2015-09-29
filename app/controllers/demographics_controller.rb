class DemographicsController < ApplicationController
 	before_filter :set_search
 
  def index
  	@results = @search.result
  	@search.state_cont = 'Open' && @search.race_cont = 'Open' && @search.sex_cont = 'Open' unless params[:q] 
  	@demographics = @search.result
  	# remember if you want to have extras re:age, set params[:q]["age_eq"] = "All Ages"
  	@figuresYears = [];
  	@deaths = []
  	# add figure table to be accessible
  	unless params[:q] == nil 
	  	@search.result.each do |dem|
				@figures = Figure.find_by_sql "SELECT * FROM figures WHERE demographic_id = " + dem.id.to_s
				@figuresYears.push(@figures)
			end
		end
	
		# add death table to be accessible
		unless @figuresYears[0] == nil;
		 	@figuresYears[0].each do |figure|
		 		@death = Death.find_by_sql "SELECT * FROM deaths WHERE id = " + figure.death_id.to_s
				@deaths.push(@death[0])
			end
		end
		#
		# @map = File.read("app/assets/javascripts/states.json")

		gon.demographics = @demographics
		gon.deaths = @deaths
		gon.figYears = @figuresYears
		
	end

	def set_search
		@search=Demographic.search(params[:q])
	end

end