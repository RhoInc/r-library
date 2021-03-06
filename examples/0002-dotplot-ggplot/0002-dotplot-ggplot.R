#' ---
#' title: DOTPLOT GGPLOT
#' description: Discrete data dotplot using ggplot
#' author: B Krouse
#' language: R
#' package: ggplot2
#' plot type: dotplot
#' features: dotplot, r, ggplot2, facet, median, highlight, stack points, discrete
#' ---

new_fig_dir <- "H:/GitHub/viz-library/examples/0002-dotplot-ggplot"
new_fig_name <- "0002-dotplot-ggplot"

# Figure code

# load packages
pacman::p_load(dplyr, tidyr, ggplot2)

# read in data
data <- read.csv('data/discrete_scores.csv')

# create column containing median score for each category
data <- data %>%
  group_by(category) %>%
  mutate(m=median(score),
         lab=c('gray60','red')[I(score==m)+1])


# plot function
p <- ggplot(data, aes(x=score)) +
  geom_vline(aes(xintercept = m, color='red'), size=1, data=data) +
  geom_dotplot(aes(x=score), fill="gray30", color="gray30",stackdir='center', binwidth=1, dotsize=1.1, stackratio=1.5) +
  facet_wrap(~category, ncol=1, scales='free_x') +
  theme_bw() +
  scale_x_continuous(minor_breaks=seq(0,100,5), breaks = seq(0, 100, 20), limits=c(0,100)) +
  theme(
    strip.text = element_text(size=12),
    strip.text = element_text(size=12),
    plot.background = element_blank(),
    panel.grid.major.y = element_blank(),
    panel.grid.minor.y = element_blank(),
    panel.grid.major.x = element_line(color='gray60'),
    panel.grid.minor.x = element_blank(),
    panel.border = element_blank(),
    axis.title=element_blank(),
    axis.text.y=element_blank(),
    axis.ticks.y=element_blank(),
    axis.ticks.x=element_blank(),
    axis.text.x=element_text(color='gray60'),
    strip.background = element_rect(fill = 'gray90', color=NA),
    legend.position = "none"
  )

# Save image of figure
png(file='./examples/0002-dotplot-ggplot/0002-dotplot-ggplot.png',height = 8, width = 8, units = 'in', res = 300)
p
dev.off()


# Create tags and README.md
source('util/r_scripts/createSuppFiles.R')
createSuppFiles(new_fig_name, example_type='R-examples')
