import pandas as pd
import numpy as np
from scipy.signal import bilinear, lfilter
import matplotlib.pyplot as plt

# Read CSV file
data = pd.read_csv('D:\vibration\adxl3451.csv')

# Extract acceleration data
cax = data.iloc[:, 1].values
cay = data.iloc[:, 2].values
caz = data.iloc[:, 3].values

# Sampling rate
Fs = 650

# Filter parameters
f1 = 6.31
f2 = 1258.9
Q1 = 0.71
f3 = 15.915
f4 = 15.915
Q2 = 0.64
K = 1

a1 = 4 * np.pi**2 * f2**2
b1 = 2 * np.pi * f3
g1 = 2 * np.pi * K * f4**2
a = 2 * np.pi * f1 / Q1
b = 4 * np.pi**2 * f1**2
c = 2 * np.pi * f2 / Q1
d = 4 * np.pi**2 * f2**2
e = 2 * np.pi * f4 / Q2
f = 4 * np.pi**2 * f4**2

num1 = [a1, 0, 0]
den1 = [1, (a + c), (a * c + b + d), (a * d + b * c), b * d]

# Calculate the filter Coefficients for the Band Limiting Filters  
B1, A1 = bilinear(num1, den1, fs=Fs)

num2 = [g1, b1 * g1]
den2 = f3 * [1, e, f]

# Calculate the filter Coefficients for the Frequency weighting  
B2, A2 = bilinear(num2, den2, fs=Fs)

B = np.convolve(B1, B2)
A = np.convolve(A1, A2)

# Apply filter
filteredx = lfilter(B, A, cax)
filteredy = lfilter(B, A, cay)
filteredz = lfilter(B, A, caz)

# Calculate RMS values of raw data
rmsx_raw = np.sqrt(np.mean(cax**2))
rmsy_raw = np.sqrt(np.mean(cay**2))
rmsz_raw = np.sqrt(np.mean(caz**2))

# Calculate RMS values of filtered data
rmsx = np.sqrt(np.mean(filteredx**2))
rmsy = np.sqrt(np.mean(filteredy**2))
rmsz = np.sqrt(np.mean(filteredz**2))

# Calculate ahv
ahv = np.sqrt(rmsx**2 + rmsy**2 + rmsz**2)

# Display RMS values of raw data
print(f'RMS of raw data along X axis: {rmsx_raw} m/s^2')
print(f'RMS of raw data along Y axis: {rmsy_raw} m/s^2')
print(f'RMS of raw data along Z axis: {rmsz_raw} m/s^2')

# Display results
print(f'RMS acceleration along X axis: {rmsx} m/s^2')
print(f'RMS acceleration along Y axis: {rmsy} m/s^2')
print(f'RMS acceleration along Z axis: {rmsz} m/s^2')
print(f'ahv = {ahv} m/s^2')

# Calculate A(8) - Assuming full 8-hour exposure period
T_exposure = 8 * 3600  # in seconds
T_measured = len(cax) / Fs  # duration of measurement in seconds
A8 = ahv * np.sqrt(T_measured / T_exposure)

print(f'A(8) = {A8} m/s^2')

# Plot Time Domain Data
t = np.arange(len(cax)) / Fs
plt.figure()
plt.subplot(3, 1, 1)
plt.plot(t, cax)
plt.xlabel('time (s)')
plt.ylabel('acc (m/s^2)')
plt.title('X-axis data')

plt.subplot(3, 1, 2)
plt.plot(t, cay)
plt.xlabel('time (s)')
plt.ylabel('acc (m/s^2)')
plt.title('Y-axis data')

plt.subplot(3, 1, 3)
plt.plot(t, caz)
plt.xlabel('time (s)')
plt.ylabel('acc (m/s^2)')
plt.title('Z-axis data')

# Plot Filtered Data
plt.figure()
plt.subplot(3, 1, 1)
plt.plot(t, filteredx)
plt.xlabel('time (s)')
plt.ylabel('acc (m/s^2)')
plt.title('Filtered X-axis data')

plt.subplot(3, 1, 2)
plt.plot(t, filteredy)
plt.xlabel('time (s)')
plt.ylabel('acc (m/s^2)')
plt.title('Filtered Y-axis data')

plt.subplot(3, 1, 3)
plt.plot(t, filteredz)
plt.xlabel('time (s)')
plt.ylabel('acc (m/s^2)')
plt.title('Filtered Z-axis data')

plt.show()
