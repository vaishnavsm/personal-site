module Jekyll
  module AssetFilter
    def to_template(input)
      arr = input.split('.')
      arr[ arr.length() - 2 ] += "-thumbnail"
      arr.join('.')
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
